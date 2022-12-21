// Angular Library
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { NotificationService } from "../../systeme/services/notification.service";

import { UserModel } from "src/app/extranet/systeme/modeles/user.modele";
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: boolean = false;
  userAuth: UserModel;

  constructor(private http: HttpClient, private router: Router, private notService: NotificationService, public tokenServ: TokenService) {
    if (eval(sessionStorage.getItem('auth'))) {
      this.auth = eval(sessionStorage.getItem('auth'));
    };
  }

  /**
   * Authentifier un utilisateur
   * @param u Objet d'identification
   * @method authUser() - Authentifie un user en fct. d'un email et d'un mdp
   */
  authUser(u: UserModel): void {
    this.http.get(environment.SERV + 'comptes/' + u.compte + '/' + u.mdp).subscribe(
      retour => {
        if (retour['status'] == '401' || !retour['compte']) {
          this.tokenServ.token = null;
          console.log("Echec de la connexion");
        } else {
          this.tokenServ.token = retour['token'];
          this.userAuth = retour['compte'];
          if (this.userAuth.statut) this.tokenServ.statut = this.userAuth.statut;
          console.log(this.tokenServ.statut);
          this.connexion(null);
          this.router.navigateByUrl('/intranet');
          this.notService.openSnackBar('Bienvenue ' + u.email, 'connexion');
        }
      },
      erreur => {
        console.log(erreur);
        this.notService.openSnackBar('Erreur dans les paramètres de connexion', 'Connexion');
      }
    )
  }
  /** Système d'authentification temporaire */
  authLocalUser(u: UserModel) {
      this.http.get(`assets/serveur/${u.compte}@${u.mdp}.json`).subscribe(
        {
          next: (user) => {
            this.tokenServ.token = user['token'];
            this.userAuth = user;
            if (this.userAuth.statut) this.tokenServ.statut = this.userAuth.statut;
            this.connexion(null);
          },
          error: (er) => this.notService.openSnackBar('Erreur dans les paramètres de connexion', 'Connexion'),
          complete: () => {
            this.router.navigateByUrl('/intranet');
            this.notService.openSnackBar('Bienvenue ' + u.email, 'connexion');
          }
        }
      );
  }
  /**
   * Déconnecter l'utilisateur
   */
  deconnexion() {
    this.auth = false;
    this.tokenServ.token = null;
    this.tokenServ.statut = 0;
    this.router.navigateByUrl('/');
    sessionStorage.setItem('auth', null);
  }
  /**
   * Connecter un utilisateur
   */
  connexion(token) {
    sessionStorage.setItem('auth', 'true');
    this.auth = true;
    console.log("Auth", this.auth);
    if (token) {
      this.tokenServ.token = token;
    }
  }
}
