import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CollectionCloudI, NoticeCloudI } from '../modeles/Types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudEditService {

  api:string; // API to call for read / write

  constructor(private http: HttpClient) { }

  /** Update a collection */
  addCollection(add: CollectionCloudI):Observable<any> {
    return this.http.post(this.api + '/collections/create', add);
  }
  /** Add a collection */
  updateCollection(up: CollectionCloudI):Observable<any> {
    // console.log(add);
    return this.http.put(this.api + '/collections/update', up);
  }
  /** Deleting a collection */
  deleteCollection(del:string) {
    const options = {
      // headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: {id: del}
    };
    this.http.delete(this.api + '/collections/delete', options).subscribe({
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
    this.http.put(this.api + '/notices/update', add).subscribe({
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
    return this.http.post(this.api + '/notices/create', add);
  }
  /** Update a notice */
  postNotice(up: NoticeCloudI) {
    this.http.put(this.api + '/notices/update', up).subscribe({
      next: (resp: any) => {
        // this.setScannedData(dir, resp);
        console.log('Next', resp);
      },
      error: (e) => console.error(e),
      complete: () => console.info('Mise à jour des notices terminée')
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
