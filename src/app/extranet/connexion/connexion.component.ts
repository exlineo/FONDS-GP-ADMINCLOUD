// Angular Library
import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

// Service
import { AuthService } from "src/app/extranet/systeme/services/auth.service";
import { NotificationService } from "src/app/extranet/systeme/services/notification.service";
import { MatDialog } from '@angular/material/dialog';

import { InscriptionComponent } from "src/app/extranet/inscription/inscription.component";
import { UserModel } from '../systeme/modeles/user.modele';

@Component({
	selector: 'app-connexion',
	templateUrl: './connexion.component.html',
	styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

	con:UserModel=<UserModel>{};

	constructor(
		// private router: Router,
		public authService: AuthService,
		public l: NotificationService,
		public dialog: MatDialog
	) { }

	ngOnInit() {
    this.l.getLangue(this.l.langage);
  }

	/**
	 * @method authentifier() - Envois une requête de connexion via authService
	 */
	authentifier(): void {
		// if(this.con.compte && this.con.mdp) this.authService.authUser(this.con);
    if(this.con.compte && this.con.mdp) this.authService.authLocalUser(this.con);
	}

	/**
	 * @method openDialog() - ouvre une pop in d'inscription
	 * @param event l'event du lien à prevent
	 */
	openDialog(event): void {
		event.preventDefault();
		const dialogRef = this.dialog.open(InscriptionComponent, {
			width: '550px',
			data: { }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}
}
