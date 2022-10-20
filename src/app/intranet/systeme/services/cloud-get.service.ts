import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CloudConfigI } from '../modeles/ModelesI';
import { CollectionCloudI, NoticeCloudI } from '../modeles/Types';

@Injectable({
  providedIn: 'root'
})
export class CloudGetService {

  config:CloudConfigI;
  // Collections
  collections:Array<CollectionCloudI> = [];
  collection:CollectionCloudI = <CollectionCloudI>{};
  // Notices
  notices:Array<NoticeCloudI> = [];
  notice:NoticeCloudI = <NoticeCloudI>{};
  // Scanned folders
  scanFolders:Array<string> = [];
  scannedData:any;

  constructor(private http:HttpClient) {
    this.getCloudConfig();
  }

  /** Récupérer les getters et setters sur le Cloud */
  getCloudConfig(){
    this.http.get(environment.CLOUD_CONFIG).subscribe((conf)=>{
      this.config = conf[0];
      console.log(this.config);
      this.getCollections();
    })
  }
  /** Récupérer la liste des collections */
  getCollections(){
    this.http.get<Array<CollectionCloudI>>(this.config.collections).subscribe(collecs => {
      this.collections = collecs;
      console.log(collecs);
    });
  };
  /** Get list of notices from a collection */
  getNoticesByCollec(ids:Array<any>){
    this.http.post(this.config.notices, ids).subscribe((resp:any) => {
      this.notices = resp.Responses.notices;
      console.log(resp.Responses, resp.Responses.notices);
    });
  }
  /** Get list of folders in S3 */
  getFolders(){
    this.http.get(this.config.xmp).subscribe((resp:any) => {
      this.scanFolders = resp;
    });
  }
  /** Scan a folder and get data */
  scanFolder(dir:string){
    this.http.post(this.config.xmp, dir).subscribe((resp:any) => {
      this.scannedData = resp;
      console.log(resp);
    });
  }
}
