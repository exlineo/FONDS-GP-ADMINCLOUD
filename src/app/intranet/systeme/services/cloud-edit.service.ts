import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CollectionCloudI, NoticeCloudI } from '../modeles/Types';

@Injectable({
  providedIn: 'root'
})
export class CloudEditService {

  setters: any = {};
  api:string;

  constructor(private http: HttpClient) { }
  cloudCollection() {
    console.log();
  }
  /** Send notices to databases */
  setBatchNotices() {

  }
  /** Update a collection */
  postCollection(up: CollectionCloudI) {
    this.http.post(this.api + '/collections/edti', up).subscribe({
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
    return this.http.put(this.api + '/collections/edit', add);
  }
  /** Deleting a collection */
  deleteCollection(del:string) {
    const options = {
      // headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: {id: del}
    };
    this.http.delete(this.api + '/collections/edit', options).subscribe({
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
    this.http.put(this.api + '/notices/edit', add).subscribe({
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
    return this.http.put(this.api + '/notices/edit', add);
  }
  /** Update a notice */
  postNotice(up: NoticeCloudI) {
    this.http.post(this.api + '/notices/edit', up).subscribe({
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
    this.http.delete(this.api + '/notices/edit', options).subscribe({
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
    return this.http.delete(this.api + '/notices/edit', options);
  }
}
