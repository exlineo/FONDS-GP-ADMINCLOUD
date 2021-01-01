import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { catchError } from "rxjs/operators";
import { TokenService } from './token.service';

@Injectable()
export class AuthIntercepteur implements HttpInterceptor {
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
    // Réécriture des entêtes si un token existe
    if (this.tokenServ.token) {
      this.entetes = {
        headers: req.headers
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + this.tokenServ.token)
      }
    }
    else {
      this.entetes = {
        headers: req.headers.set('Content-Type', 'application/json')
      }
    }
    const authReq = req.clone(this.entetes);

    // Envoyer la nouvelle requête
    return next.handle(authReq)
      .pipe(
        catchError((erreur) => {
          console.log("Une erreur s'est produite");
          console.log(erreur); // Récupérer les erreurs et les affichers
          // return Observable.throw(erreur); // Renvoyer l'erreur
          return throwError(erreur)
        })) as any;
  }

}