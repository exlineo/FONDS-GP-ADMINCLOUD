import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CloudConfigI } from '../modeles/ModelesI';
import { CollectionCloudI, NoticeCloudI } from '../modeles/Types';

@Injectable({
  providedIn: 'root'
})
export class CloudGetService {

  config: CloudConfigI;
  edit: CloudConfigI;
  schemas: any;
  // Collections
  collections: Array<CollectionCloudI> = [];
  collection: CollectionCloudI = <CollectionCloudI>{};
  // Notices
  notices: Array<NoticeCloudI> = [];
  notice: NoticeCloudI = <NoticeCloudI>{};
  // Scanned folders
  scannedFolders: Array<string> = [];
  scannedData: Array<any>;

  load: boolean = false; // Afficher un spinner lorsque les données sont en train d'être scannées

  constructor(private http: HttpClient) {
    this.getCloudConfig();
  }
  init() {
    this.collection = <CollectionCloudI>{};
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
        if (c.idconfigurations == 'setters') this.edit = c;
      })
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
    this.http.post(this.config.xmp, dir).subscribe({
      next: (resp: any) => {
        this.setScannedData(dir, resp);
        this.setScannedCollection();
        // console.log('Next', resp);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
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
      notice.idnotices = this.setIdNotices(dir, n.oai_nema ?? n.oai_nema.id, n.oai_dc ?? n.oai_dc.title);
      notice.date = n.oai_dc.date;
      notice.dublincore = n.oai_dc;
      notice.prefix = ['oai_dc'];
      if (n.oai_nema) {
        notice.nemateria = n.oai_nema;
        notice.prefix.push('oai_nema');
      }
      if (n.media) notice.media = n.media;
    }
    return notice;
  }
  setIdNotices(dir: string, id: string = null, title: string = null) {
    if (id && id.length > 0) return dir + '-' + id;
    if (title && title.length > 0) return title.replace(/\s/g, "-").toLowerCase();
    return dir + '-' + (Math.random() + 1).toString(36).substring(7);
  }
  /** Get data to create a collection from scanned set of data */
  setScannedCollection() {
    this.collection.notices = this.scannedData;
    this.collection.type = 'images';
    this.scannedData.forEach(n => {
      // Create series
      if (n.series) {
        if (this.collection.series && !this.collection.series.includes(n.series)) this.collection.series = [this.collection.series, ...n.series];
      };
      // Add Data to
      if (!this.collection.title && n.collection_name) this.collection.title = n.collection_name;
      if (!this.collection.alias && n.set_name) this.collection.alias = this.setAlias(n.set_name);
      if (!this.collection.set && n.set_name) this.collection.set = n.set_name;
      if (!this.collection.creator && n.collection_manager) this.collection.creator = n.collection_manager;
      if (!this.collection.date) this.collection.date = Date.now();
      if (!this.collection.description && n.collection_infos) this.collection.description = n.collection_infos;
      if (!this.collection.funds && n.collection_funds) this.collection.funds = n.collection_funds;
      if (!this.collection.language && n.language) this.collection.language = n.language;
      if (!this.collection.who && (n.publisher || n.who_scans)) this.collection.who = n.publisher ? n.publisher : n.who_scans;
      if (n.type && (n.type.indexOf('video') != -1 || n.type.indexOf('audio') != -1)) this.collection.type = 'multimedia';

      for (let i in this.collection) {
        if (!this.collection[i] && n[i] && i != 'series' && i != 'notices') this.collection[i] = n[i];
      }
    });
    // console.log(this.collection);
    this.load = false;
  }
  /** Create an alias */
  setAlias(str) {
    return str.toLowerCase().replace(' ', '-')
  }
  /** Créer ou mettre à jour une collection */
  creeCollection() {

  }
}
