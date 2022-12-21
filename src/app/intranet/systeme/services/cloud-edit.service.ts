import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CollectionCloudI, NoticeCloudI } from '../modeles/Types';

@Injectable({
  providedIn: 'root'
})
export class CloudEditService {

  setters: any = {};

  constructor(private http: HttpClient) { }
  cloudCollection() {
    console.log();
  }
  /** Send notices to databases */
  setBatchNotices() {

  }
  /** Update a collection */
  postCollection(up: CollectionCloudI) {
    this.http.post(this.setters.collections, up).subscribe({
      next: (resp: any) => {
        // this.setScannedData(dir, resp);
        console.log('Next', resp);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
  /** Add a collection */
  addCollection(add: CollectionCloudI) {
    // console.log(add);
    return this.http.put(this.setters.collections, add);
  }
  /** Deleting a collection */
  deleteCollection(del:string) {
    const options = {
      // headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: {id: del}
    };
    this.http.delete(this.setters.collections, options).subscribe({
      next: (resp: any) => {
        // this.setScannedData(dir, resp);
        console.log('Next', resp);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
  /** Add a collection */
  addNotice(add: NoticeCloudI) {
    this.http.put(this.setters.notices, add).subscribe({
      next: (resp: any) => {
        // this.setScannedData(dir, resp);
        console.log('Next', resp);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
  /** Ajouter une liste de notices (généralement 25 max d'un coup) */
  addListeNotices(add: Array<NoticeCloudI>) {
    return this.http.put(this.setters.notices, add);
  }
  /** Update a notice */
  postNotice(up: NoticeCloudI) {
    this.http.post(this.setters.notices, up).subscribe({
      next: (resp: any) => {
        // this.setScannedData(dir, resp);
        console.log('Next', resp);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });

  }
  /** Deleting a collection */
  deleteNotice(del:string) {
    const options = {
      // headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: {id: del}
    };
    this.http.delete(this.setters.notices, options).subscribe({
      next: (resp: any) => {
        // this.setScannedData(dir, resp);
        console.log('Next', resp);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
  /** Supprimer les notices d'une collection avant de supprimer la collection */
  deleteListeNotices(dels:Array<string>){
    const options = {
      // headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: dels
    };
    return this.http.delete(this.setters.notices, options);
  }
}
