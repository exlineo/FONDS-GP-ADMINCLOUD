import { Component, OnInit } from '@angular/core';

import { CollectionI } from '../systeme/modeles/collection.modele';
import { CollectionService } from '../systeme/services/collection.service';
import { NoticeService } from '../systeme/services/notice.service';
import { UtilsService } from '../systeme/library/utils.service';
import { TokenService } from 'src/app/extranet/systeme/services/token.service';
import { CollectionCloudI } from '../systeme/modeles/Types';
import { CloudGetService } from '../systeme/services/cloud-get.service';

@Component({
	selector: 'app-collections',
	templateUrl: './collections.component.html',
	styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

	collectionListe: Array<CollectionCloudI> = []; // Liste de toutes les collections
	idCollection:number | string;
	idNotice:number | string;

	detailsCollec: boolean = false;
	afficheEnlever: boolean = false;
	delete:boolean = false;

	filtreSerie:string=''; // Filtrer les notices d'une collection en fonction de sa série

	constructor(public colServ: CollectionService, public noticesServ:NoticeService, public utils:UtilsService, public tokenServ:TokenService, public cloud:CloudGetService) { }

	ngOnInit() {}
	/**
	 * Afficher le détail d'une collection
	 * @param index Index de la collection dans le tableau des collections
	 * @param idCollection Id de la collection à afficher
	 */
	collectionOnClick(id): void {
    console.log("Collection cliquée", id);
		this.idCollection = id;
    this.cloud.collection = this.cloud.collections.filter(c => c.idcollections = id)[0];
    console.log(this.cloud.collection);
		// Identifier la collection cliquée
		// this.colServ.getCollection(id);
    this.cloud.getNoticesByCollec(this.cloud.collection.notices);
		// Récupérer les notices de la collection
		// this.noticesServ.getNoticesByCollec(this.colServ.collection.notices);
		// this.noticesServ.getNoticesByCollec(this.colServ.collection._id);
	}
	/**
	 *
	 * @param id Afficher la fenêtre de validation pour l'enlèvement d'une notice dans une collection
	 */
	noticeOnEnlever(id){
		console.log("Notice à enlever", id);
		this.idNotice = id;
		this.afficheEnlever = true;
	}
	/**
	 * Enlever toutes les fenêtres pop-up et initialiser la collection et les notices
	 */
	masque(){
		this.detailsCollec = false;
		this.afficheEnlever = false;
		this.idNotice = null;
		this.idCollection = null;
	}
}
