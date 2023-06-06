import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	constructor(public snackBar: MatSnackBar) { }

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
		duration: 2000,
		});
	}
	/**
	 * Notifier les usagers
	 * @param message Message à afficher
	 * @param action Type d'action engagée pour l'afficher dans la barre
	 */
	notif(message: string, action: string="Notification") {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}
}
