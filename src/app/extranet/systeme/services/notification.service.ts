import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationModele } from '../modeles/notification.modele';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	notifications:Array<NotificationModele>;

	constructor(public snackBar: MatSnackBar) {
		this.notifications = [
			{
				titre:'FGP on the road',
				soustitre:'Le projet avance',
				description:"La gestion des collections est prête (reste leur administration un peu amicau), le site doit s'enrichir de contenus et les infrastructures sont prêtes",
				lien:'http://fonds-gp.org'
			}
		]
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
		duration: 2000,
		});
	}
}
