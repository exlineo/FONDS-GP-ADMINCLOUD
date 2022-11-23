import { Injectable } from '@angular/core';
import { NoticeCloudI } from '../modeles/Types';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  limite:number; // nombre de notices à charger à chaque état de pagination
  params = {
    limite:20,
    langue:'fr_FR'
  }
  /**
   * Partage de méthodes dans les composants
   */
  constructor() {
    this.limite = 30;
  }
  /**
   * Connaître le type d'un objet
   * @param value Valeur dont on veut connaître le type
   */
  typeOf(value) {
    if(Array.isArray(value)){
      return 'array';
    }
		return typeof value;
  }
  /**
   * Tronquer un tableau pour une pagination
   * @param ar Tableau à tronquer
   * @param page Début et fin du slice sur le tableau
   */
  tronqueTab(ar:Array<any>, page:any){
    return ar.slice(page.min, page.max);
  }
  /**
   * Eviter de lister les documents
   * @param c chaîne ou objet représentant une clé dans un objet listé
   */
  getObj(c:any){
    if(typeof c !== 'object') return true;
    return false;
  }
  /**
   * Extension à étudier pour renvoyer un format
   */
  setFormat(ext:string):string | boolean{
    console.log(ext);
    switch(ext){
      case 'mp3':
      case 'oga':
      case 'ogg':
      case 'aac':
        return 'audio/'+ext;
        break;
      case 'wav':
        return 'audio/x-wav';
        break;
      case 'mp4':
      case 'webm':
      case 'ogv':
      case 'vba':
        return 'video/'+ext;
        break;
      case 'rtf':
      case 'pdf':
        return 'application/'+ext;
        break;
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'png':
      case 'webp':
        return 'image/'+ext;
        break;
      default:
        return false;
      }
  }
  /**
	 * Afficher l'arrière plan d'une notice
	 * @param n Notice dont il faut gérer l'affichage d'arrière plan
	 */
	setNoticeBg(adr:string, n:NoticeCloudI){
		const type = n.dc.format;
		let bg = '';
		if(type && (type.indexOf('video') != -1 || type.indexOf('audio') != -1)){
			n.dc.coverage ? bg = n.dc.coverage : bg = 'assets/img/pictos/picto_media.png';
		}else if(type && type.indexOf('application') != -1){
			bg = 'assets/img/pictos/picto_docs.png';
		}else{
			bg = adr+n.media.url;
		}
		return `url("${bg}")`;
	}
	/**
	 * Jouer une vidéo ou un audio
	 * @param ev Evéneùent déclenché
	 */
	play(ev){
    if(ev.currentTarget.previousElementSibling){
      let el = ev.currentTarget.previousElementSibling;
      if( el.tagName.indexOf('VIDEO') != -1 || el.tagName.indexOf('AUDIO') != -1 ) el.play();
    }
	}
	/**
	 * Mettre en pause un média
	 * @param ev Evéneùent déclenché
	 */
	pause(ev){
    if(ev.currentTarget.previousElementSibling){
	  	let el = ev.currentTarget.previousElementSibling;
		  if( el.tagName.indexOf('VIDEO') != -1 || el.tagName.indexOf('AUDIO') != -1 ) el.pause();
    }
	}
}
