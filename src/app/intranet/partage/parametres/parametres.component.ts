import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/extranet/systeme/services/auth.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {

  env:any;

  constructor(public uServ:AuthService) { }

  ngOnInit() {
    this.env = environment;
  }

}
