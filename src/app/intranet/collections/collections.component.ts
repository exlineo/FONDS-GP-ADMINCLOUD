import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/extranet/systeme/services/token.service';
import { UtilsService } from '../systeme/library/utils.service';
import { CollectionCloudI } from '../systeme/modeles/Types';
import { CloudGetService } from '../systeme/services/cloud-get.service';

@Component({
	selector: 'app-collections',
	templateUrl: './collections.component.html',
	styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

	collectionListe: Array<CollectionCloudI> = []; // Liste de toutes les collections
	idCollection:number | string; // Id de la collection en cours
	idNotice:number | string;

	detailsCollec: boolean = false; // Eéditer la collection
	afficheEnlever: boolean = false;
	delete:boolean = false;
  pagine = {d:0, e:20}; // Pagination

	filtreSerie:string=''; // Filtrer les notices d'une collection en fonction de sa série

	constructor(public tokenServ:TokenService, public cloud:CloudGetService, public utils:UtilsService) { }

	ngOnInit() {}
	/**
	 * Afficher le détail d'une collection
	 * @param index Index de la collection dans le tableau des collections
	 * @param idCollection Id de la collection à afficher
	 */
	colClick(id): void {
    console.log("Collection cliquée", id);
		this.idCollection = id;
    this.cloud.collection = this.cloud.collections.filter(c => c.idcollections = id)[0];
    console.log(this.cloud.collection);
    this.cloud.getNoticesByCollec(this.cloud.collection.notices);
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
  /** Gérer les paginations */
  suite(sens:boolean){
    console.log(this.pagine, this.cloud.notices.length);
    if(sens){
      // on avance
      if(this.pagine.d + this.pagine.e < this.cloud.notices.length-1){
        this.pagine.d += this.pagine.e;
      }else{
        this.pagine.d = this.pagine.d + this.pagine.e - this.cloud.notices.length-1;
      }
    }else{
      // On recule
      if(this.pagine.d - this.pagine.e < 0){
        this.pagine.d = this.cloud.notices.length-1 + this.pagine.d - this.pagine.e;
      }else{
        this.pagine.d -= this.pagine.e;
      }
    }
    console.log(this.pagine, this.cloud.notices.length);
  }
}
