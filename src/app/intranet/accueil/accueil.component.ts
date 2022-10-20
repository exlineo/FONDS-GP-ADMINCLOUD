import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../systeme/services/collection.service';
import { NoticeService } from '../systeme/services/notice.service';
import { CollectionI } from '../systeme/modeles/collection.modele';
import { CloudGetService } from '../systeme/services/cloud-get.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  collec:CollectionI;

  constructor(public colServ:CollectionService, public noticesServ:NoticeService, private cloudServ:CloudGetService) { }

  ngOnInit() {
  }

}
