import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  decoupe:number = 0;

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
      console.log(this.config, this.schemas);
      this.getCollections();
    })
  }
  /** Récupérer la liste des collections */
  getCollections() {
    this.http.get<Array<CollectionCloudI>>(this.config.collections).subscribe(collecs => {
      this.collections = collecs;
      console.log(collecs);
    });
  };
  /** Get list of notices from a collection */
  getNoticesByCollec(ids: Array<any>) {
    this.http.post(this.config.notices, ids).subscribe((resp: any) => {
      this.notices = resp.Responses.notices;
      // console.log(resp.Responses, resp.Responses.notices);
    });
  }
  /** Get list of folders in S3 */
  getFolders() {
    this.http.get(this.config.xmp).subscribe((resp: any) => {
      this.scannedFolders = resp;
    });
  }
  /** Scan a folder and get data */
  scanFolder(dir: string) {
    this.load = true;
    this.http.post(this.config.xmp, dir).subscribe({
      next: (resp: any) => {
        this.scannedCollection = new CollectionCloud();
        this.setScannedData(dir, resp);
        console.log('Next', resp);
      },
      error: (e) => console.error(e),
      complete: () => this.load = false
    }
    );
  }
  /** setSetNotices */
  setScannedData(dir: string, ar: Array<any>) {
    this.scannedData = [];
    // console.log(ar);
    ar.forEach(n => this.scannedData.push(this.setNotice(dir, n)));
  }
  /** Generate notice from scanned data */
  setNotice(dir: string, n: any) {
    let notice: NoticeCloudI = <NoticeCloudI>{};
    if (Object.keys(n).length > 0) {
      // console.log(dir, n);
      notice.idnotices = this.setIdNotices(dir, n);
      notice.date = n.oai_dc.date;
      notice.dublincore = n.oai_dc;
      notice.prefix = ['oai_dc'];
      if (n.oai_nema) {
        notice.nemateria = n.oai_nema;
        notice.prefix.push('oai_nema');
      }
      if (n.media) notice.media = n.media;
      // Créer une collection à partir des notices scannées
      this.setScannedCollection(notice);
    }
    // console.log(notice);
    return notice;
  }
  /** Create ID for notices from the object's data */
  setIdNotices(dir: string, n: any) {
    // n.oai_nema ?? n.oai_nema.id, n.oai_dc ?? n.oai_dc.title
    if (n.oai_nema && n.oai_nema.id) return dir + '_' + n.oai_nema.id;
    if (n.oai_dc && n.oai_dc.title) return dir + '_' + n.oai_dc.title.replace(/\s/g, "-").toLowerCase();
    return dir + '_' + (Math.random() + 1).toString(36).substring(7);
  }
  /** Get data to create a collection from scanned set of data */
  setScannedCollection(n: NoticeCloudI) {
    // Create series
    if (n.nemateria.series && Array.isArray(n.nemateria.series)) n.nemateria.series.forEach(s => { if (!this.collection.series.includes(s)) { this.collection.series.push(s) } });
    // Add notices ids to collection list of notices
    this.scannedCollection.notices.push(n.idnotices);
    // Add Data to
    if (this.scannedCollection.title.length == 0 && n.nemateria.collection_name) this.scannedCollection.title = n.nemateria.collection_name;
    if (this.scannedCollection.alias.length == 0 && n.nemateria.set_name) this.scannedCollection.alias = n.nemateria.set_name.toLowerCase().replace(' ', '-');
    if (this.scannedCollection.setname.length == 0 && n.nemateria.set_name) this.scannedCollection.setname = n.nemateria.set_name;
    if (this.scannedCollection.creator.length == 0 && n.nemateria.collection_manager) this.scannedCollection.creator = n.nemateria.collection_manager;
    if (!this.scannedCollection.timecode) this.scannedCollection.timecode = Date.now();
    if (this.scannedCollection.description.length == 0 && n.nemateria.collection_infos) this.scannedCollection.description = n.nemateria.collection_infos;
    if (!this.scannedCollection.funds && n.nemateria.collection_funds) this.scannedCollection.funds = n.nemateria.collection_funds;
    if (n.nemateria.lang) this.scannedCollection.lang = n.nemateria.lang;
    if (!this.scannedCollection.publisher && (n.nemateria.publisher || n.nemateria.who_scans)) this.scannedCollection.publisher = n.nemateria.publisher ? n.nemateria.publisher : n.nemateria.who_scans;
    if (n.dublincore.format && (n.dublincore.format.indexOf('video') != -1 || n.dublincore.format.indexOf('audio') != -1)) this.scannedCollection.mediatype = 'multimedia';
    // Attribuer les valeurs scannées à la collection en cours de traitement
    this.collection = {...this.scannedCollection};
  };
  /** Créer ou mettre à jour une collection */
  sendCloudCollection() {
    // Si toutes les notices ont été enregistrées, on enregistre la collection
    if(this.decoupe >= this.notices.length){
      this.set.addCollection(this.collection);
    }else{
      if(this.decoupe + 25 < this.notices.length) {
      this.decoupe += 25;
    }
    }

    // if (this.collection.idcollections) {
    //   this.set.postCollection(this.collection);
    // } else {
    //   this.collection.idcollections = this.collection.setname.replace(" ", "") + '_' + (Math.random() + 1).toString(36).substring(7);
    //   this.set.addCollection(this.collection);
    // };
    console.log(this.collection);
  }
}
