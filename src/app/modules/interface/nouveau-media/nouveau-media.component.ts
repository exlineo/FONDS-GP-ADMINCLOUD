import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MediaService } from "../../../systeme/services/media.service";
import { NotificationService } from "../../../systeme/services/notification.service";
import { MediaModel } from 'src/app/systeme/modeles/media.modele';

@Component({
	selector: 'app-nouveau-media',
	templateUrl: './nouveau-media.component.html',
	styleUrls: ['./nouveau-media.component.css']
})
export class NouveauMediaComponent implements OnInit {

	mediaForm: FormGroup;
	newMedia: MediaModel;

	constructor(public mediaService: MediaService, private notService: NotificationService) { }

	ngOnInit() {
		this.newMedia = {
			id: -1,
			type: 'undefined',
			name: 'undefined',
			directory: 'undefined',
			img: 'assets/img/default.jpg',
			description: 'undefined'
		};
		this.mediaForm = new FormGroup({
			nom: new FormControl('', [
				Validators.required
			]),
			type: new FormControl('', [
				Validators.required
			]),
			description: new FormControl('', [
				Validators.required
			]),
			url: new FormControl('')
		});
	}

	/**
	 * @method save() - Sauvegarde les informations en base de données
	 */
	save() {
		if (this.mediaForm.valid) {
			this.newMedia.id = this.mediaService.initMedias.length;
			this.newMedia.name = this.mediaForm.value.nom;
			this.newMedia.type = this.mediaForm.value.type;
			this.newMedia.description = this.mediaForm.value.description;
			this.newMedia.img = this.mediaForm.value.url;

			this.mediaService.createMedia(this.newMedia).subscribe(
				() => {
					this.mediaService.initMedias.push(this.newMedia);
					this.notService.openSnackBar('Le média à été ajouter.', 'serveur');
				}
			)
		}
		else
			this.notService.openSnackBar('Formulaire nom remplis', 'Formulaire');
	}

	/**
	 * @method reset() - Reinitialise le formulaire
	 */
	reset() {
		this.mediaForm = new FormGroup({
			nom: new FormControl('', [
				Validators.required
			]),
			type: new FormControl('', [
				Validators.required
			]),
			description: new FormControl('', [
				Validators.required
			]),
			url: new FormControl('')
		});
	}
}
