import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/intranet/systeme/services/notification.service';
import { AuthService } from '../../../extranet/systeme/services/auth.service';
import { SetI } from '../modeles/collection.modele';

@Injectable({
  providedIn: 'root'
})
export class SetsService {
  // dataStorage: string = 'assets/dataStorage/';

  sets: Array<SetI>; // La liste des collections
  set: SetI; // Un SET sélectionnée
  series: Array<any>; // Tableau des séries d'une collection donnée

  constructor(private http: HttpClient, private notifServ: NotificationService, private auth: AuthService) {
    console.log("Service des connexions");
    this.getSets();
  }
  /**
   * Récupérer l'ensemble des collections disponibles dans le depôt
   */
  getSets(): void {
    this.http.get<Array<SetI>>(environment.SERV + 'sets').subscribe(
      data => {
        this.sets = data;
      },
      erreur => {
        console.log(erreur);
        this.notifServ.notif("Une erreur s'est produite dans l'enregistrement");
      }
    )
  }
  /**
   * Renvoyer une collection du tableau en fonction de son _id
   * @param id _id de la notice à récupérer
   * @return CollectionI (une collection)
   */
  getSet(id: number | string): void {
    for (let s of this.sets) {
      if (s._id == id) {
        this.set = s;
      }
    }
  }
  /**
   * Supprimer la collection
   * @param id ID de la collection à supprimer
   */
  supprSet(id: any) {
      this.http.delete(environment.SERV + 'sets/' + id).subscribe(
        retour => {
          this.sets.splice(this.sets.findIndex(s => s._id == id), 1);
        },
        erreur => {
          console.log(erreur);
          this.notifServ.notif("Une erreur s'est produite dans l'enregistrement");
        }
      )
  }
  /**
   * Mise à jour d'un SET
   */
  majSet(s: SetI) {
      this.http.put(environment.SERV + 'sets/' + s._id, s).subscribe(
        retour => {
          this.notifServ.notif("Le SET a été mis à jour");
        },
        erreur => {
          console.log(erreur);
          this.notifServ.notif("Une erreur s'est produite dans l'enregistrement");
        }
      )
  }
  /**
   * Ajouter une collection
   */
  ajouteSet(s: SetI) {
      this.http.post(environment.SERV + 'sets', s).subscribe(
        retour => {
          console.log(retour);
          this.notifServ.notif("Le SET a été ajouté");
        },
        erreur => {
          console.log(erreur);
          this.notifServ.notif("Une erreur s'est produite dans l'enregistrement");
        }
      )
  }
  /**
   * Les séries d'une collection
   * @param id ID de la collection dont nous recherchons les séries
   */
  getFonds(f: string) {
    this.http.get(environment.SERV + 'sets/' + f).subscribe(
      retour => {
        console.log(retour);
        this.notifServ.notif("La liste des fonds a été obtenue");
      },
      erreur => {
        console.log(erreur);
        this.notifServ.notif("Une erreur s'est produite dans l'enregistrement");
      }
    )
  }
}
