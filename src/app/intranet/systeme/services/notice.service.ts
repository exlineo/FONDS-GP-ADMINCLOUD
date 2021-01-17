import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/intranet/systeme/services/notification.service';
import { DocumentModel } from '../modeles/documents-model';
import { NoticeModel } from '../modeles/notice.modele';

@Injectable({
	providedIn: 'root'
})
export class NoticeService {

	noticesCollec:Array<NoticeModel>; // Des notices d'une collection donnée
	noticesAll:Array<NoticeModel>; // Récupérer la liste de toutes les notices...

	seriesCollec:Array<string>=[]; // La liste des séries présentes dans les notices de la collection

	constructor(private http: HttpClient, private notifServ:NotificationService) {
		this.getNotices();
	}

	/**
	 * Récupérer l'ensemble des notices disponibles
	 */
	getNotices(): void {
		this.http.get<Array<NoticeModel>>(environment.SERV+'notices').subscribe(
			data => {
				console.log(data);
				this.noticesAll = data;
			},
			erreur => {
				console.log(erreur);
				this.notifServ.notif("Une erreur s'est produite dans l'enregistrement");
			}
		)
	}
	/**
	 * Récupérer les notices d'une collection
	 * @param id ID de la collection dont nous souhaitons les notices
	 */
	getNoticesByCollec(id){
		this.noticesCollec = [];
		this.http.get<Array<NoticeModel>>(environment.SERV+'notices/collection/'+id, {params:{'idCollection':id}}).subscribe(
			data => {
				console.log(data);
				this.noticesCollec = data;
				this.getSeries();
				this.notifServ.notif("Les notices ont été créées");
			},
			erreur => {
				console.log(erreur);
				this.notifServ.notif("Une erreur s'est produite dans l'enregistrement");
			}
		)
	}
	/**
	 * Renvoyer une notice du tableau en fonction de son _id
	 * @param id _id de la notice à récupérer
	 * @param select Ajouter select à la notice pour noter qu'elle a été sélectionnée
	 * @return DocumentModel (une notice)
	 */
	getNotice(id: number | string, select:boolean=false):NoticeModel {
		for(let n of this.noticesAll){
			if(n._id == id){
				if(select){
					n.selected = true;
				}
				return n;
			}
		}
	}
	/**
	 * Mettre à jour une notice
	 * @param notice ID de la notice à enlever de la collection
	 */
	updateNotice(id:string, notice:NoticeModel){
		this.http.put(environment.SERV+'notices/'+id, notice).subscribe(
			retour => {
				console.log(retour);
				this.notifServ.notif("Mise à jour de la notice effectuée");
			},
			erreur => {
				console.log(erreur);
				this.notifServ.notif("Une erreur s'est produite dans l'enregistrement");
			}
		)
	}
	/**
	 * Supprimer une notice
	 * @param id ID de la notice à supprimer
	 */
	supprNotice(id){
		this.http.delete(environment.SERV+'notices/'+id).subscribe(
			retour => {
				console.log(retour);
				this.notifServ.notif("La notice a été supprimée");
			},
			erreur => {
				console.log(erreur);
				this.notifServ.notif("Une erreur s'est produite dans l'enregistrement");
			}
		)
	}
	/**
	 * Récupérer la liste des séries depuis les notices chargées
	 */
	getSeries(){
		this.seriesCollec = [];
		// for(let s of this.noticesCollec){
		// 	if(s.relations.serie && this.seriesCollec.indexOf(s.relations.serie) == -1){
		// 		this.seriesCollec.push(s.relations.serie);
		// 	}
		// }
	}
}
