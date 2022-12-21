import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CloudConfigI } from '../modeles/ModelesI';
import { CollectionCloud, CollectionCloudI, NoticeCloudI } from '../modeles/Types';
import { CloudEditService } from './cloud-edit.service';

@Injectable({
  providedIn: 'root'
})
export class CloudGetService {

  config: CloudConfigI;
  schemas: any;
  // Collections
  collections: Array<CollectionCloudI> = [];
  collection: CollectionCloudI = new CollectionCloud();
  // Notices
  notices: Array<NoticeCloudI> = [];
  notice: NoticeCloudI = <NoticeCloudI>{};
  // Scanned folders
  scannedFolders: Array<string> = []; // List of folder in S3 bucket
  scannedData: Array<any>; // List of data inside the documents in the S3 bucket
  scannedCollection:CollectionCloudI; // Enregistrer les données de collection après un scan

  load: boolean = false; // Afficher un spinner lorsque les données sont en train d'être scannées
  fakeId:string = '';

  constructor(private http: HttpClient, public set: CloudEditService) {
    this.getCloudConfig();
  }
  init() {
    this.collection = new CollectionCloud();;
    // Notices
    this.notices = [];
    this.notice = <NoticeCloudI>{};
    // Scanned folders
    this.scannedFolders = [];
    this.scannedData = [];
  }
  /** Récupérer les getters et setters sur le Cloud */
  getCloudConfig() {
    this.http.get(environment.CLOUD_CONFIG).subscribe((conf: Array<any>) => {
      conf.forEach(c => {
        if (c.idconfigurations == 'getters') this.config = c;
        if (c.idconfigurations == 'schemas') this.schemas = c;
        if (c.idconfigurations == 'setters') this.set.setters = c;
      });
      this.getCollections();
    })
  }
  /** Récupérer la liste des collections */
  getCollections() {
    this.http.get<Array<CollectionCloudI>>(this.config.collections).subscribe(collecs => {
      this.collections = collecs;
    });
  };
  /** Get list of notices from a collection */
  getNoticesByCollec(ids: Set<any>) {
    this.http.post(this.config.notices, ids).subscribe((resp: any) => {
      this.notices = resp.Responses.notices;
    });
  }
  /** Get list of folders in S3 */
  getFolders() {
    this.load = true;
    this.http.get(this.config.xmp).subscribe(
      {
        next: (resp: any) => {
          this.scannedFolders = resp;
        },
        error: (e) => {
          console.error(e);
          this.load = false;
        },
        complete: () => this.load = false
      }
    );
  }
  /** Scan a folder and get data from XMP lambda */
  scanFolder(dir: string) {
    this.load = true;
    this.http.post(this.config.xmp, dir).subscribe({
      next: (resp: any) => {
        this.scannedCollection = new CollectionCloud();
        this.setScannedData(dir, resp);
      },
      error: (e) => {
        console.error(e);
        this.load = false;
      },
      complete: () => this.load = false
    }
    );
  }
  /** setSetNotices */
  setScannedData(dir: string, ar: Array<any>) {
    this.scannedData = [];
    this.fakeId = (Math.random() + 1).toString(36).substring(7)+ '_' + dir.replace(/\s/g, "-").toLowerCase() + '_';
    ar.forEach(n => { if(n.oai_media.size > 0) this.scannedData.push(this.setNotice(dir, n)) });
  }
  /** Generate notice from scanned data */
  setNotice(dir: string, n: any) {
    let notice: NoticeCloudI = <NoticeCloudI>{};
    if (Object.keys(n).length > 0) {
      notice.dc = n.oai_dc;
      notice.prefix = ['oai_dc'];
      if (n.oai_nema) {
        notice.nema = n.oai_nema;
        notice.prefix.push('oai_nema');
      }
      if (n.oai_media) notice.media = n.oai_media;

      notice.idnotices = this.setIdNotices(dir, notice);
      // Créer une collection à partir des notices scannées
      this.setScannedCollection(notice);
    }
    return notice;
  }
  /** Create ID for notices from the object's data */
  setIdNotices(dir: string, n: any) {
    // let rand = (Math.random() + 1).toString(36).substring(7)+ '_' + dir + '_';
    let rand =  this.fakeId;
    // n.oai_nema ?? n.oai_nema.id, n.oai_dc ?? n.oai_dc.title
    if (n.nema && n.nema.id) {
      // rand += n.nema.id.toLowerCase();
      rand += n.media.file.toLowerCase();
    }
    // if (n.oai_dc && n.oai_dc.title) {
    //   rand += n.oai_dc.title.replace(/\s/g, "-").toLowerCase();
    // };
    return rand;
  }
  /** Get data to create a collection from scanned set of data */
  setScannedCollection(n: NoticeCloudI) {
    // Create series
    if (n.nema.series) {
      let series = [];
      if(n.nema.series.indexOf(",") != -1) {
        series = n.nema.series.split(",");
      }else if(n.nema.series.indexOf(",") != -1) {
        series = n.nema.series.split(";");
      } else{
        series.push(n.nema.series);
      };

      series.forEach(s => this.scannedCollection.series.add(s.replace(/\s/g, '')));
    };
    // Add notices ids to collection list of notices
    this.scannedCollection.notices.add(n.idnotices);
    // Add Data to collection
    if (this.scannedCollection.title.length == 0 && n.nema.collection_name) this.scannedCollection.title = n.nema.collection_name;
    if (this.scannedCollection.alias.length == 0 && n.nema.set_name) this.scannedCollection.alias = n.nema.set_name.toLowerCase().replace(' ', '-');
    if (this.scannedCollection.setname.length == 0 && n.nema.set_name) this.scannedCollection.setname = n.nema.set_name;
    if (this.scannedCollection.creator.length == 0 && n.nema.collection_manager) this.scannedCollection.creator = n.nema.collection_manager;
    if (!this.scannedCollection.timecode) this.scannedCollection.timecode = Date.now();
    if (this.scannedCollection.description.length == 0 && n.nema.collection_infos) this.scannedCollection.description = n.nema.collection_infos;
    if (!this.scannedCollection.funds && n.nema.collection_funds) this.scannedCollection.funds = n.nema.collection_funds;
    if (!n.dc.language) this.scannedCollection.language.add(n.dc.language);
    if (!this.scannedCollection.publisher && (n.nema.publisher || n.nema.who_scans)) this.scannedCollection.publisher = n.nema.publisher ? n.nema.publisher : n.nema.who_scans;
    if (n.dc.format && (n.dc.format.indexOf('video') != -1 || n.dc.format.indexOf('audio') != -1)) this.scannedCollection.typecollection = 'multimedia';
  };
  /** Créer ou mettre à jour une collection */
  sendCloudNotices() {
    this.load = true;
    // Si toutes les notices ont été enregistrées, on enregistre la collection
      this.set.addListeNotices(this.scannedData).subscribe({
        next: (resp: any) => {
        },
        error: (e) => {
          console.error("Erreur sur la création des notices : ", e);
          this.load = false;
        },
        complete: () => {
          // this.load = false;
          console.log('Envoie des notices terminé');
          this.sendCloudCollection();
        }
      });
  }
  /** Envoyer la collection dans la Cloud en modifant quelques paramètres */
  sendCloudCollection(){
    this.scannedCollection.series = [...this.scannedCollection.series];
    this.scannedCollection.notices = [...this.scannedCollection.notices];
    this.scannedCollection.language = [...this.scannedCollection.language];
    this.scannedCollection.idcollections = this.fakeId;
    this.set.addCollection(this.scannedCollection).subscribe({
      next: (resp: any) => {
        console.log('Next', resp);
      },
      error: (e) => {
        this.load = false;
        console.error("Notices ok mais la collection bloque", e);
      },
      complete: () => {
        this.load = false;
        console.info('Collection ajoutée après ses notices');
      }
    });
  }
  /** Supprimer les notices d'une collection puis la collection */
  delCoudNotices(){
    this.load = true;
    this.set.deleteListeNotices(this.collection.notices).subscribe(
      {
        next: (resp: any) => {
          console.log('Next', resp);
        },
        error: (e) => {
          this.load = false;
          console.error(e);
        },
        complete: () => {
          this.load = false;
          console.info('complete');
        }
      }
    )
  }
}
