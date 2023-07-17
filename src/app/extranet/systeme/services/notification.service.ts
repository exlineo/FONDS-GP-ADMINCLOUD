import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationModele } from '../modeles/notification.modele';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	notifications:Array<NotificationModele>; // List of notifications
  langage:string = 'fr_FR'; // Selected language
  t:any = {}; // Translations for interface

	constructor(public snackBar: MatSnackBar, private http:HttpClient) {
		this.notifications = [
			{
				titre:'FGP on the road',
				soustitre:'Le projet avance',
				description:"La gestion des collections est prête (reste leur administration un peu amicau), le site doit s'enrichir de contenus et les infrastructures sont prêtes",
				lien:'http://fonds-gp.org'
			}
		];
    console.log("initialisation du service de notifications");
    this.getLangue(this.langage);
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
		duration: 2000,
		});
	}
  /** Load language data
   * @param {string} lang Language shortcut
   */
  async getLangue(lang:string){
    console.log("Appel des données");
    if(this.langage != lang) this.langage = lang;
    await this.http.get(`/assets/langues/${lang}/l.json`).subscribe(trad => this.t = trad);
    console.log(this.t);
  }
}
