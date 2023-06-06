// Angular Library
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

// Service
import { AuthService } from "src/app/extranet/systeme/services/auth.service";
import { NotificationService } from "src/app/extranet/systeme/services/notification.service";
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
	selector: 'app-inscription',
	templateUrl: './inscription.component.html',
	styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
	userForm = new FormGroup({
		nom: new FormControl('', [
			Validators.required
		]),
		email: new FormControl('', [
			Validators.required,
			Validators.email,
		]),
		mdp: new FormControl('', [
			Validators.required,
			Validators.minLength(8)
		]),
	});

	constructor(
		private notService: NotificationService,
		public authService: AuthService,
		public dialogRef: MatDialogRef<InscriptionComponent>
	) { }

	ngOnInit() {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	/**
	 * @method save() - Envois une requête de connexion via authService
	 */
	save(): void {
		if (this.userForm.valid) {
			this.authService.authUser(this.userForm.value);
			//this.dialogRef.close();
		} else {
			this.notService.openSnackBar('formulaire non valide', 'inscription');
		}

	}

	/**
	 * @method reset() - Reinitialyse le formulaire
	 */
	reset(): void {
		this.userForm = new FormGroup({
			nom: new FormControl('', [
				Validators.required
			]),
			email: new FormControl('', [
				Validators.required,
				Validators.email,
			]),
			mdp: new FormControl('', [
				Validators.required,
				Validators.minLength(8)
			]),
		});
	}

}
