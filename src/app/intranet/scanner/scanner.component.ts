import { Component, OnInit, OnDestroy ,EventEmitter, Output } from '@angular/core';

import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators, NgModel } from '@angular/forms';

import { ScanService } from '../systeme/services/scan.service';
import { UtilsService } from '../systeme/library/utils.service';
import { MappagesService } from '../systeme/services/mappages.service';
import { Router } from '@angular/router';
import { FiltresService } from '../systeme/services/filtres.service';
import { FiltreModel, Filtre } from '../systeme/modeles/filtre.modele';
import { SetModel, Set } from '../systeme/modeles/set';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../extranet/systeme/services/auth.service';
import { CloudGetService } from '../systeme/services/cloud-get.service';

@Component({
	selector: 'app-scanner',
	templateUrl: './scanner.component.html',
	styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit, OnDestroy {

	scanListe: Array<string>;
	set: SetModel;
	filtreChoisi: FiltreModel;
	_idFiltre: string; // ID d'un filtre choisi
	page: any; // Objet pour la pagination

	constructor(public scanServ: ScanService, public filtresServ: FiltresService, public mapServ: MappagesService, public utils: UtilsService, private router: Router, public auth:AuthService, public cloud:CloudGetService) { }

	ngOnInit() {
		this.set = new Set();
		this.set.date = Date.now();
		this.filtreChoisi = new Filtre();
		this.page = { min: 0, max: 20 };
    // Get folders on Cloud
    this.cloud.getFolders();
	}
	/**
	 * Accéder aux notices d'une scan
	 * @param dossier Dossier scanné pour afficher la liste des notices
	 */
	scanOnClick(dossier) {
		// Modification des données du SET initial
		this.set.titre = dossier; // Attribuer un titre par défaut au Set
		this.set.alias = dossier.toLowerCase(); // Proposer un alias par défaut
		this.set.origine = {dir:environment.DIR+dossier, url:environment.SERV}; // Intégrer le nom du dossier scanné dans les données du SET
		// this.scanServ.getDir(dossier);
    this.cloud.scanFolder(dossier);
	}
	/**
	 * Envoyer les clés au service de mappage
	 * @param s Clés du set scanné dans le dossier
	 */
	extraitSet() {
		this.mapServ.set.documents = this.scanServ.scans[0];
		this.router.navigateByUrl('/intranet/mappages');
	}
	/**
	 * FIltre choisi depuis la liste déroulante
	 */
	choixFiltre() {
		this.filtreChoisi = this.filtresServ.filtres.find(f => f._id == this._idFiltre);
		console.log(this.filtreChoisi);
	}
	/**
	 * Lancer la copie des données scannée vers un tableau de données filtrées
	 * @param f Données du formulaire
	 */
	creeSet(f: NgForm) {
		console.log(f.value);
		this.scanServ.setMetas(this.filtreChoisi, this.set);
	}
	/**
	 * Pagination des données scannées
	 * @param n Nombre à faire évoluer pour la pagination
	 */
	pagine(n: number) {
		this.page.min += n;
		this.page.max += n;
		console.log(this.page);
	}
	/**
	 * Supprimer les scans sélectionnés initialement
	 */
	ngOnDestroy(){
		this.scanServ.scans = [];
	}
}
