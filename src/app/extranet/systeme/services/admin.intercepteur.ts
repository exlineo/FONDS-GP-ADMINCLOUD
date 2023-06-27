import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from "rxjs/operators";
import { TokenService } from './token.service';

@Injectable()
export class AdminIntercepteur implements HttpInterceptor {
  entetes: object;
  /**
   * Interepteur qui ajouter un token d'identification à chaque requête HTTP sortante
   * L'intercepteur clone un requête, transforme la requête clonée et l'envoie
   */
  constructor(public tokenServ: TokenService) { }
  /**
   * Récupérer les requêtes, les cloner et ajouter l'authentification si elle existe
   * @param req La requête interceptée
   * @param next La requête clonée
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.condition(req)) {
      const adminReq = req.clone();
      // Envoyer la nouvelle requête
      return next.handle(adminReq)
        .pipe(
          catchError((erreur) => {
            console.log("Une erreur s'est produite", erreur);
            return erreur
          })) as any;
    }else{
      console.log("Vos droits ne permettent pas de faire cette opération");
      return new Observable();
    }
  }
  condition(r):boolean{
    let bool:boolean = false;
    // la requête ne concerne pas une mise à jour des données
    // Corriger plus tard le traitement sur l'url
    if(r.method == 'GET' || (this.tokenServ.statut >= 2 && this.tokenServ.token) || r.url.indexOf('notices/collection')){
      bool = true;
    }
    return bool;
  }
}
