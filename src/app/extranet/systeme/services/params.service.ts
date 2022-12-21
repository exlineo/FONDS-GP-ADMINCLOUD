import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  SERV:string;
  DIR:string;

  constructor(private http:HttpClient) {
    this.SERV = 'http://vps550598.ovh.net:8080/';
    this.DIR = 'collections/';
  }
  /**
   * Modifier les valeurs d'environnement par défaut
   */
  setEnv(){
    this.http.get('assets/serveur/params.json').subscribe(
      p => {
        // environment.SERV = p['SERV'];
        // environment.DIR = p['DIR'];
      },
      e => {
        console.log("Erreur dans le chargement du fichier", e);
      }
    )

  }
}
