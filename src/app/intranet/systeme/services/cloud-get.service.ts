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
  scanFolders: Array<string> = [];
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
    this.scanFolders = [];
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
      console.log(resp.Responses, resp.Responses.notices);
    });
  }
  /** Get list of folders in S3 */
  getFolders() {
    this.http.get(this.config.xmp).subscribe((resp: any) => {
      this.scanFolders = resp;
    });
  }
  /** Scan a folder and get data */
  scanFolder(dir: string) {
    this.http.post(this.config.xmp, dir).subscribe({
      next: (resp: any) => {
        this.scannedData = resp;
        this.setScannedCollection();
        console.log('Next', resp);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    }
    );
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
    console.log(this.collection);
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
