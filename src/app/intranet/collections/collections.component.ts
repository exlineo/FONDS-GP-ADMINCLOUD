import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/extranet/systeme/services/token.service';
import { UtilsService } from '../systeme/library/utils.service';
import { CollectionCloudI } from '../systeme/modeles/Types';
import { CloudGetService } from '../systeme/services/cloud-get.service';
import { NotificationService } from '../../extranet/systeme/services/notification.service';

@Component({
	selector: 'app-collections',
	templateUrl: './collections.component.html',
	styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

	collectionListe: Array<CollectionCloudI> = []; // List of all collections
	idCollection:number | string; // Selected collection
	idNotice:number | string; // Selected notice

	detailsCollec: boolean = false; // Udate a collection data
	afficheEnlever: boolean = false;
	delete:boolean = false; // Agree to delete
  pagine = {d:0, e:20}; // Pagination

	filtreSerie:string=''; // Filter notices by serie name

	/**
   *
   * @param tokenServ Security token service
   * @param get Calling data from Cloud
   * @param utils Some shared code
   * @param l Access to notifications and language service
   */
  constructor(
    public tokenServ:TokenService,
    public get:CloudGetService,
    public utils:UtilsService,
    public l:NotificationService) { }

	ngOnInit() {}
	/**
	 * Display selected collection
	 * @param id Id of the collection to show
	 */
	colClick(id): void {
    console.log("Collection cliquée", id);
		this.idCollection = id;
    this.get.collection = this.get.collections.find(c => c.idcollection = id);
    this.get.getNoticesByCollec(this.get.collection.notices);
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
		// this.idNotice = null;
		// this.idCollection = null;
	}
  /** Gérer les paginations */
  suite(sens:boolean){
    console.log(this.pagine, this.get.notices.length);
    if(sens){
      // on avance
      if(this.pagine.d + this.pagine.e < this.get.notices.length-1){
        this.pagine.d += this.pagine.e;
      }else{
        this.pagine.d = this.pagine.d + this.pagine.e - this.get.notices.length-1;
      }
    }else{
      // On recule
      if(this.pagine.d - this.pagine.e < 0){
        this.pagine.d = this.get.notices.length-1 + this.pagine.d - this.pagine.e;
      }else{
        this.pagine.d -= this.pagine.e;
      }
    }
    console.log(this.pagine, this.get.notices.length);
  }
}
