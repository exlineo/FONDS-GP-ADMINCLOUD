import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CollectionI, NoticeI } from '../modeles/collection.modele';

import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/intranet/systeme/services/notification.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../extranet/systeme/services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class CollectionService {

	// dataStorage: string = 'assets/dataStorage/';
	collections: Array<CollectionI>; // La liste des collections
	collection: CollectionI; // Une collection sélectionnée
	series: Array<any>; // Tableau des séries d'une collection donnée
	notices: Array<NoticeI>; // Tableau temporaire de notices

	constructor(private http: HttpClient, public notifServ: NotificationService, private router: Router, private auth: AuthService) {
		this.getCollections();
	}
	/**
	 * Récupérer l'ensemble des collections disponibles dans le depôt
	 */
	getCollections(): void {
		this.http.get<Array<CollectionI>>(environment.SERV + 'collections').subscribe(
			data => {
				this.collections = data;
				this.notifServ.notif('Collections récupérées');
			}
		)
	}
	/**
	 * Renvoyer une collection du tableau en fonction de son _id
	 * @param id _id de la notice à récupérer
	 * @return CollectionI (une collection)
	 */
	getCollection(id: number | string) {
		for (let c of this.collections) {
			if (c._id == id) {
				this.collection = c;
				this.notifServ.notif('Collection récupérée');
				// return c;
			}
		}
	}
	/**
	 * Mise à jour d'une collection
	 */
	majCollection() {
		this.http.put(environment.SERV + 'collections/', this.collection).subscribe(
			retour => {
				this.notifServ.notif("La collection a été mise à jour");
			},
			erreur => {
				this.notifServ.notif("Une erreur s'est produite dans l'enregistrement");
			}
		)
	}
	/**
	 * Ajouter une collection
	 */
	ajouteCollection() {
		this.http.post(environment.SERV + 'collections', this.collection).subscribe(
			retour => {
				this.collections.push(this.collection);
				this.router.navigateByUrl('/intranet/collections')
				this.notifServ.notif("La collection a bien été ajoutée");
			},
			erreur => {
				this.notifServ.notif("Une erreur s'est produite dans l'enregistrement");
			}
		)
	}
	/**
	 * Supprimer la collection
	 * @param id ID de la collection à supprimer
	 */
	supprCollec(id) {
		this.http.delete(environment.SERV + 'collections/' + id).subscribe(
			retour => {
				this.notifServ.notif("Collection supprimée");
				this.collections.splice(this.collections.findIndex(c => c._id == id), 1);
			},
			erreur => {
				console.log(erreur);
				this.notifServ.notif("Une erreur s'est produite dans la destrucion de la collection");
			}
		);

	}
	/**
	 * Les séries d'une collection
	 * @param id ID de la collection dont nous recherchons les séries
	 */
	getSeries(id) {
		this.http.get(environment.SERV + 'collections/' + id + '/series').subscribe(
			retour => {
				this.notifServ.notif("Les séries ont été extraites");
			},
			erreur => {
				this.notifServ.notif("Une erreur s'est produite dans l'enregistrement");
			}
		)
	}
	/**
	 * Paquet de notices à créer puis insertion d'une collection
	 * @param ar Tableau de notices à envoyer au serveur pour les créer par paquetes
	 */
	ajouteNoticeAvantCollection() {
		this.http.post(environment.SERV + 'notices/true', this.notices).subscribe(
			retour => {
				// Attribution des ids des notices à la collection (retour de la base)
				this.collection.notices = Object.values(retour['insertedIds']);
				this.ajouteCollection(); // Ajouter la collection une fois que les notices sont ajoutées
				this.notifServ.notif("Les notices ont été insérées dans la base de données.");
			},
			erreur => {
				console.log(erreur);
				this.notifServ.notif("Une erreur dans l'enregistrement des notices");
			}
		)
	}
}
