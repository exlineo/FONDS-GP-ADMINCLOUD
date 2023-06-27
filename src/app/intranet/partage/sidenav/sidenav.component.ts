import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/extranet/systeme/services/auth.service';
import { NotificationService } from 'src/app/extranet/systeme/services/notification.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public authServ:AuthService, public l:NotificationService) { }

  ngOnInit() {
  }

  toggleActif(el){
  }
}
