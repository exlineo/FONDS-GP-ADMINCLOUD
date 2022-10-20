import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { useAnimation, transition, trigger, style, animate, state } from '@angular/animations';

import { FiltreModel, Filtre } from '../systeme/modeles/filtre.modele';
import { FiltresService } from '../systeme/services/filtres.service';
import { TokenService } from 'src/app/extranet/systeme/services/token.service';

@Component({
	selector: 'app-filtres',
	templateUrl: './filtres.component.html',
	styleUrls: ['./filtres.component.css']
})
export class FiltresComponent implements OnInit {
	filtre: FiltreModel;
	edition: boolean; // Afficher la fenêtre d'édition d'un filtre
	supprime: boolean; // Afficher la fenêtre de confirmation pour la suppression d'un filtre
	afficheFiltre: boolean; // Afficher la fiche de modification du filtre
	filtreSerie: string = ''; // Filtrer les notices d'une collection en fonction de sa série

	constructor(public filtresServ: FiltresService, private rendu: Renderer2, public tokenServ:TokenService) { }

	ngOnInit() {
		this.filtre = new Filtre();
		this.edition = false;
		this.afficheFiltre = false;
	}
	/**
	 * Afficher le détail d'une collection
	 * @param idCollection Id de la collection à afficher
	 */
	filtreOnClick(id): void {
		this.filtresServ.filtres.forEach(
			f => {
				if (f._id == id) {
					this.filtre = f;
				}
			}
		);
		console.log(this.filtre);
	}
	/**
	 * Activer ou désactiver l'édition du filtre
	 */
	setEdit() {
		this.edition = !this.edition;
	}
	/**
	 * Supprimer une métadonnée traitée par le filtre
	 * @param id ID de la métadonnées à supprimer
	 */
	supprMeta(cle:string) {
		console.log("Clé à supprimer");
		// this.filtre.metadonnees.splice(id, 1);
	}
	/**
	 * Enlever toutes les fenêtres pop-up et initialiser la collection et les notices
	 */
	masque() {
		this.edition = false;
		this.supprime = false;
	}
	ajouteFiltre() {
		this.filtre = new Filtre();
		this.edition = true;
	}
	/**
	 * Faire apparaitre une pop-up pour valider la suppression d'un filtre
	 */
	supprimeFiltre() {
		console.log(this.filtre);
		if (this.filtre._id) {
			this.filtresServ.supprimeFiltre(this.filtre._id);
		}else{
			this.filtresServ.notif("Merci de sélectionner un filtre à supprimer...");

		}
	}
}
