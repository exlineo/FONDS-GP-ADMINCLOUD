import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard  {

	constructor(private tokenServ:TokenService, private router:Router) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		  return this.tokenServ.token ? true : false;
	}

	canLoad(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.tokenServ.token ? true : false;
    }
}
