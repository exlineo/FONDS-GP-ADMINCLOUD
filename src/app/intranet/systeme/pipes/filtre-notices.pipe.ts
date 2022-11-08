import { Pipe, PipeTransform } from '@angular/core';
import { FiltrePipeModel } from '../modeles/pipes.modele';
import { NoticeCloudI } from '../modeles/Types';
/**
 * Filtre sur les notices en utilisant un objet de filtre
 * La valeur 'pure' permet de traiter les changements de l'objet filtre en temps réel
 */
@Pipe({
	name: 'filtreNotices',
	pure: false
})
export class FiltreNoticesPipe implements PipeTransform {
	public transform(values: Array<NoticeCloudI>, filtre:FiltrePipeModel): any[] {
		if (!values || !values.length) return [];
		if (!filtre) return values;

		if (filtre.libre.length > 2) {
			return values.filter(
				v => {
					let tmp = JSON.stringify(v).toLowerCase();
					if(tmp.indexOf(filtre.libre) !== -1){
						return v;
					};
			});
		}else if(filtre.type){
			return values.filter(
				v => {
					if(v.dublincore.format.indexOf(filtre.type) !== -1){
						return v;
					};
			});
		}else if(filtre.dateDebut){
			return values.filter(
				v => {
					let debut = Date.parse(filtre.dateDebut);
					if(v.dublincore.date >= debut){
						return v;
					};
			});
		}else if(filtre.dateFin){
			return values.filter(
				v => {
					let fin = Date.parse(filtre.dateFin);
					if(v.dublincore.date <= fin){
						return v;
					};
			});
		}
		else{
			return values;
		}
	}
}
