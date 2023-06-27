import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token:string;
  statut:number = 0;

  constructor() { }
}
