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
  }
  /**
   * Modifier les valeurs d'environnement par défaut
   */
  setEnv(){
    this.http.get('assets/serveur/params.json').subscribe({
      next:p => {},
      error:e => {
        console.log("Erreur dans le chargement du fichier", e);
      },
      complete:() => console.log('Paramètres chargés')
    }
    )

  }
}
