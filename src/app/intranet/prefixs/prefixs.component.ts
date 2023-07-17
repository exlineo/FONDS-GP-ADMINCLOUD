import { Component } from '@angular/core';
import { CloudGetService } from '../systeme/services/cloud-get.service';
import { TokenService } from 'src/app/extranet/systeme/services/token.service';
import { NotificationService } from 'src/app/extranet/systeme/services/notification.service';
import { UtilsService } from '../systeme/library/utils.service';
import { PRefixCloud, PrefixCloudI } from '../systeme/modeles/Types';

@Component({
  selector: 'app-prefixs',
  templateUrl: './prefixs.component.html',
  styleUrls: ['./prefixs.component.css']
})
export class PrefixsComponent {

  prefix:PrefixCloudI; // The prefix edited actually
  delete:boolean = false; // Ask confirmation before deleting prefix
  add:boolean = false; // Are we creating a new prefix ?
  update:boolean = false; // Are we updating a prefix ?

  constructor(
    public tokenServ:TokenService,
    public get:CloudGetService,
    public utils:UtilsService,
    public l:NotificationService) { }
    /**
     * Get data of a prefix in the list of prefixs
     * @param p Nom of the prefix to get
     */
    prefClick(i:number){
      this.add = false;
      this.update = false;
      this.prefix = this.get.prefixs[i];
      console.log(this.prefix);
    }
    /** Add a new prefix */
    addPrefif(){
      this.prefix = {
        id:'',
        prefix:'',
        schema:[],
        title:''
      }
    }
    /** Update an existing prefix */
    updatePrefix(){
      this.prefix = {
        id:'',
        prefix:'',
        schema:[],
        title:''
      }
    }
    /** Show update */
    showUpdate(){
      this.add = false;
      this.update = true;
    }
    /** Show add */
    showAdd(){
      this.prefix = new PRefixCloud();
      this.add = true;
      this.update = false;
    }
}
