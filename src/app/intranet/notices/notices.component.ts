import { Component, OnInit } from '@angular/core';

import { UtilsService } from '../systeme/library/utils.service';
import { FiltrePipeModel, FiltreNotices } from '../systeme/modeles/pipes.modele';
import { FiltreNoticesPipe } from '../systeme/pipes/filtre-notices.pipe';
import { TokenService } from 'src/app/extranet/systeme/services/token.service';
import { CloudGetService } from '../systeme/services/cloud-get.service';
import { NoticeCloudI } from '../systeme/modeles/Types';

@Component({
	selector: 'app-notices',
	templateUrl: './notices.component.html',
	styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {

	noticeListe: Array<NoticeCloudI> = []; // Liste générale des notices à afficher / filter
	noticeSelection: Array<NoticeCloudI> = []; // La liste des notices sélectionnées
	noticeChoisie:NoticeCloudI; // Notice dont on affiche les informations lorsque sollicitée

	noticeFiltre; // Tableau des notices filtrées (?)

	idNotice:number | string;
	idCollection:number | string;

	noticeAffiche: boolean = false; // Affichers les infos rapides d'une notice
	filtre:FiltrePipeModel;

	afficheDetailNotice:boolean = false; // Afficher le composant notice lors du clic sur un oeil (dans une notice)
	afficheDetailCollec:boolean = false; // Afficher le composant notice lors du clic sur un oeil (dans une notice)

	constructor(public get:CloudGetService, public utils:UtilsService, private noticesPipe:FiltreNoticesPipe, public tokenServ:TokenService) { }

	ngOnInit() {
		this.idNotice = -1;
		// this.noticesServ.getNotices();
		this.filtre = new FiltreNotices();
	}
	/**
	 * Afficher le composant avec le détail des infos sur la notice
	 *
	*/
	noticeOnAffiche(idNotice): void {
		// $event.preventDefault();
		this.idNotice = idNotice;
		this.afficheDetailNotice = !this.afficheDetailNotice;
	}
	/**
	 * Choisir une notice et la mettre dans la liste
	 *
	*/
	noticeSelectionnee(idNotice): void {
		this.idNotice = idNotice;
		if(!this.noticeSelection.find(n => n.idnotices == idNotice)){
			// this.noticeSelection.push(this.noticesServ.noticesAll.find(n => {
			// 	if(n._id == idNotice){
			// 		n.selected = true;
			// 		return n;
			// 	}
			// 	}));
		}else{
			this.noticeSelectionRemove(idNotice);
		}
	}
	/**x
	 * Afficher les infos d'une notice
	 * @param idNotice id de la notice dnt on veut les infos
	*/
	noticeOnInfo(idNotice): void {
		// if(this.noticeChoisie == this.noticesServ.noticesAll.find(n => n._id == idNotice)){
		// 	this.noticeAffiche = false;
		// 	this.noticeChoisie = null;
		// }else{
		// 	this.noticeChoisie = this.noticesServ.noticesAll.find(n => n._id == idNotice);
		// 	this.noticeAffiche = true;
		// }
	}
	// Initialiser les sélections
	noticeSelectionDump(): void {
		this.noticeAffiche = false;
		this.noticeSelection = [];
	}
	/**
	 * Enlever une notice de la sélection
	 * @param idNotice id de la notice à supprimer
	 */
	noticeSelectionRemove(idNotice): void {
		for (let index = 0; index < this.noticeSelection.length; index++) {
			let element = this.noticeSelection[index];
			element.selected = false;
			if (element.idnotices == idNotice) {
				this.noticeSelection.splice(index, 1);
			}
		}
	}
	/**
	 * Ajouter toutes les notices à la sélection pour constituer une collection en fonction des tris
	 */
	noticesToutesChoisies(): void {
		// this.noticeSelection = this.noticesServ.noticesAll;
		// this.noticeSelection = this.noticesPipe.transform(this.noticesServ.noticesAll, this.filtre);
		// this.noticeSelection.forEach(
		// 	n => {
		// 		n.selected = true;
		// 	}
		// )
	}
	/**
	 * Ne sélectionner aucune notice
	 */
	noticesAucuneChoisie(): void {
		// this.noticesServ.noticesAll.forEach(
		// 	n =>{
		// 		n.selected = false;
		// 	}
		// )
		this.noticeSelection = [];
	}
	/**
	 * Masque la notice lorsqu'on clique sur le bouton pour la fermer
	 * @param bool Booléen pour fermer la fenêtre (false)
	 */
	masque(bool:boolean){
		this.afficheDetailNotice = bool;
		this.afficheDetailCollec = bool;
		this.idNotice = -1;
		this.idCollection = -1;
	}
	/**
	 * Créer ou visualiser une collection
	 * @param id ID de la collection à afficher. -1 veut dire qu'on en crée une nouvelle
	 */
	collectionOnAffiche(id=-1){
		this.idCollection = id;
		this.afficheDetailCollec = true;
	}
	fake(){

	}
	/**
	 * Supprimer les notices sélectionnées
	 */
	noticesSuppr(){

	}
}
