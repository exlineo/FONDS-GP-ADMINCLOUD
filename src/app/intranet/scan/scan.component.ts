import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/extranet/systeme/services/token.service';
import { CloudGetService } from '../systeme/services/cloud-get.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  dir:string; // Dossier en cours de scan

  constructor(public cloud:CloudGetService, public token:TokenService) { }

  ngOnInit(): void {
    // this.cloud.getFolders();
  }
  // Get folders on cloud
  scanFold(dir:string){
    this.dir = dir;
    this.cloud.scanFolder(dir);
  }
}
