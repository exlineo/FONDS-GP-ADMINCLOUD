import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MediaService } from "../../../systeme/services/media.service";
import { MediaModel } from "../../../systeme/modeles/media.modele";
import { NotificationService } from 'src/app/systeme/services/notification.service';

@Component({
	selector: 'app-fiche-media',
	templateUrl: './fiche-media.component.html',
	styleUrls: ['./fiche-media.component.css']
})
export class FicheMediaComponent implements OnInit {

	mediaSelected: MediaModel;
	verifDelete: boolean = false;

	constructor(private route: ActivatedRoute, private location: Location, public mediaService: MediaService, private notService: NotificationService, private router: Router) { }

	ngOnInit() {
		this.mediaSelected = { id: -1, type: 'NOTFOUND', name: 'NOTFOUND', directory: 'NOTFOUND', img: 'assets/img/default.jpg', description: 'NOTFOUND' };
		this.getMediaSelected();
	}

	/**
	 * @method getIdSelected() - Recupere dans la root l'id du media selectionne
	 * @returns {number} id - l'id du media selectionne
	 */
	getIdSelected(): number {
		const id = +this.route.snapshot.paramMap.get('id');
		return id;
	}

	/**
	 * @method getMediaSelected() - Recupere les infos du media selectionne
	 */
	getMediaSelected(): void {
		if (this.mediaService.initMedias.length == 0) {
			this.mediaService.readAllMedia().subscribe(
				data => {
					this.mediaService.initMedias = data;
					this.mediaSelected = this.mediaService.initMedias.find(media => media.id == this.getIdSelected());
				}
			)
		} else {
			this.mediaSelected = this.mediaService.initMedias.find(media => media.id == this.getIdSelected());
		}
	}

	delete(): void {
		if (!this.verifDelete) {
			this.verifDelete = true;
			this.notService.openSnackBar('Cette action est définitive, si vous êtes sûr cliquer une nouvelle fois sur Supprimer', 'application');
		} else {
			this.mediaService.deleteMedia(this.mediaSelected).subscribe(
				() => {
					this.notService.openSnackBar('Le média à été supprimer.', 'serveur');
					this.mediaService.initMedias.splice(this.mediaSelected.id, 1);
					this.router.navigate(['interface/medias']);
				},
				error => {
					console.warn(error);
					this.notService.openSnackBar('Une erreur de connexion avec le serveur est survenu.', 'serveur');
				}
			)
		}
	}

}