import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { TokenService } from 'src/app/extranet/systeme/services/token.service';
import { CollectionCloudI } from '../systeme/modeles/Types';
import { CloudGetService } from '../systeme/services/cloud-get.service';
import { NotificationService } from '../../extranet/systeme/services/notification.service';

@Component({
	selector: 'app-collection',
	templateUrl: './collection.component.html',
	styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

	@Input()
	collection: CollectionCloudI; // Collection transmise à l'affichage

	@Input()
	idCollection: any; // ID de la collection à afficher

	@Output()
	fermer = new EventEmitter<boolean>();

	affiche: boolean = false;
	maj: boolean = false; // Mettre à jouer les données
	cree: boolean = false;

	constructor(
    public get:CloudGetService,
    public tokenServ:TokenService,
    public l:NotificationService) { }

	ngOnInit() {}
	/**
	 * Clic sur une collection
	 */
	collectionOnClick(): void {
		this.affiche = true;
	}
	/**
	 * Afficher le formulaire de mise à jour
	 */
	afficheMaj() {
		this.maj = !this.maj;
	}
	/**
	 * Méthode utilisée pour la mise à jour ou l'écriture d'une nouvelle collection
	 */
	ecrire() {
    console.log(this.get.collection);
		if (this.get.collection.idcollection) {
			this.get.set.updateCollection(this.get.collection).subscribe({
        next: (resp: any) => {
          // this.setScannedData(dir, resp);
          console.log('Next', resp);
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
		} else {
			// this.colServ.ajouteCollection();
			this.get.set.addCollection(this.get.collection).subscribe({
        next: (resp: any) => {
          // this.setScannedData(dir, resp);
          console.log('Next', resp);
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });;
		}
	}
	/**
	 * Mapper des données reçues pour faire une collection
	 */
	mapSet(set:any) {
		let tmp: CollectionCloudI = <CollectionCloudI>{};
		// Peupler les données dans la nouvelle collection
		for (let o in set) {
			if (tmp.hasOwnProperty(o) && o != '_id') {
				tmp[o] = set[o];
			};
		};
		console.log(tmp);
		tmp.series = new Set();
		// Récupérer les séries dans le SET
		set.documents.forEach(s => {
			// console.log(s);
      if(s.nemateria.serie){
        const se = s.nemateria.serie;
        tmp.series.add(se);
      }
			// if (s.nemateria.serie && !tmp.series.includes(s.nemateria.serie.serie)) tmp.series.push(s.nemateria.serie.serie);
		});
		// Générer la collection
		return tmp;
	}
	/**
	 * Générer des notices à partir des documents du SET (lorsqu'utile)
	 */
	genereNotices() {
		// this.colServ.notices = [];
		// this.colServ.notifServ.notif('Les notices ont été intégrées dans la collection.');
	}
	supprimeNotice(id) {

	}
}
