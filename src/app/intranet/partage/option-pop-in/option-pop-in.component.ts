import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { NotificationService } from '../../../extranet/systeme/services/notification.service';
import { MediaService } from "src/app/intranet/systeme/services/media.service";
import { MediaModel } from "src/app/intranet/systeme/modeles/media.modele";

@Component({
	selector: 'app-option-pop-in',
	templateUrl: './option-pop-in.component.html',
	styleUrls: ['./option-pop-in.component.css']
})
export class OptionPopInComponent {
	constructor(private bottomSheetRef: MatBottomSheetRef<OptionPopInComponent>, private notificationService: NotificationService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private mediaService: MediaService) { }

	mediaSelected: MediaModel;

	/**
	 * @method openLink() - Desactive le pop in apres choix de l'utilisateur
	 * @param {MouseEvent} event - event du lien à empecher
	 */
	openLink(event: MouseEvent): void {
		this.bottomSheetRef.dismiss();
		event.preventDefault();

		//this.notificationService.openSnackBar('Le media n°' + this.data.idMediaSelected +' à été séléctionner', 'event');
	}

	/**
	 * @method openFiche() - Desactive le pop in apres choix de l'utilisateur
	 * @param {MouseEvent} event event du lien à empecher
	 */
	openFiche(event: MouseEvent): void {
		this.bottomSheetRef.dismiss();
		event.preventDefault();
	}

}
