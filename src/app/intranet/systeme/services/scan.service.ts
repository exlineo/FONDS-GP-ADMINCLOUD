import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http';
import { FiltresService } from './filtres.service';

@Injectable({
	providedIn: 'root'
})
export class ScanService {

	scans: any;
	listeDossiers: any; // La liste des dossiers disponibles
	load:boolean = false; // Déclencher un loader sur la page de scan

	constructor(private http: HttpClient) {
		this.getListeDossiers();
	}

	/**
	 * Liste les dossiers scannables
	 */
	getListeDossiers() {
		this.http.get(environment.SERV + 'scans').subscribe(
			data => {
				console.log(data);
				this.listeDossiers = data;
			}
		)
	}
	/**
	   * Récupérer les métadonnées d'un fichier donné
	   */
	getMetaFiles(dir: string, f: string): void {
		// return this.http.get<Array<CollectionModel>>(this.dataStorage + 'collections.json');
		this.http.get(environment.SERV + 'scans/' + dir, { params: { 'f': f } }).subscribe(
			fichier => {
				console.log(fichier['data']);
				this.scans = fichier['data'];
			}
		)
	}
	/**
	 * Récupérer la liste des métadonnées d'un dossier en particulier
	 */
	getDir(dir:string) {
		this.scans = null;
		this.load = true;
		// return this.http.get<Array<CollectionModel>>(this.dataStorage + 'collections.json');
		this.http.get<boolean>(environment.SERV + 'scans/'+dir).subscribe(
			fichiers => {
				fichiers['data'].forEach(f => {
					for(let i in f){
						if(i.indexOf('Ingredient') !== -1 || i.indexOf('Pantry') !== -1){
							delete f[i];
						}
					}
				});
				this.scans = fichiers['data'];
				this.load = false;
			}
		)
	}

}
