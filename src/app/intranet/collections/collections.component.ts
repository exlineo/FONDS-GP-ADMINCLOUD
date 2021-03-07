import { Component, OnInit } from '@angular/core';

import { CollectionModel } from '../systeme/modeles/collection.modele';
import { CollectionService } from '../systeme/services/collection.service';
import { NoticeService } from '../systeme/services/notice.service';
import { UtilsService } from '../systeme/library/utils.service';
import { NoticeModel } from '../systeme/modeles/notice.modele';

@Component({
	selector: 'app-collections',
	templateUrl: './collections.component.html',
	styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

	collectionListe: Array<CollectionModel> = []; // Liste de toutes les collections
	idCollection:number | string;
	idNotice:number | string;
	
	detailsCollec: boolean = false;
	afficheEnlever: boolean = false;
	delete:boolean = false;

	filtreSerie:string=''; // Filtrer les notices d'une collection en fonction de sa série

	constructor(public colServ: CollectionService, public noticesServ:NoticeService, public utils:UtilsService) { }

	ngOnInit() {
	}
	/**
	 * Afficher le détail d'une collection
	 * @param index Index de la collection dans le tableau des collections
	 * @param idCollection Id de la collection à afficher
	 */
	collectionOnClick(id): void {
		this.idCollection = id;
		// Identifier la collection cliquée
		this.colServ.getCollection(id);
		// Récupérer les notices de la collection
		this.noticesServ.getNoticesByCollec(this.colServ.collection.notices);
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
	 * Afficher l'arrière plan d'une notice
	 * @param n Notice dont il faut gérer l'affichage d'arrière plan
	 */
	setNoticeBg(n:NoticeModel){
		const type = n.metadonnees.dublincore.format;
		let bg = '';
		if(type.indexOf('video') != -1 || type.indexOf('audio') != -1){
			n.metadonnees.dublincore.coverage ? bg = n.metadonnees.dublincore.coverage : bg = 'assets/img/pictos/media.jpg';
		}else if(type.indexOf('application') != -1){
			bg = 'assets/img/pictos/document.jpg';
		}else{
			bg = n.metadonnees.media.url;
		}
		return `url("${bg}")`;
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
	/**
	 * Jouer une vidéo ou un audio
	 * @param ev Evéneùent déclenché
	 */
	play(ev){
		ev.currentTarget.play();
	}
	/**
	 * Mettre en pause un média
	 * @param ev Evéneùent déclenché
	 */
	pause(ev){
		ev.currentTarget.pause();
	}
}
