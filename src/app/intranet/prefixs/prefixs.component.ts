import { Component } from '@angular/core';
import { CloudGetService } from '../systeme/services/cloud-get.service';
import { TokenService } from 'src/app/extranet/systeme/services/token.service';
import { NotificationService } from 'src/app/extranet/systeme/services/notification.service';
import { UtilsService } from '../systeme/library/utils.service';
import { PrefixCloudI } from '../systeme/modeles/Types';

@Component({
  selector: 'app-prefixs',
  templateUrl: './prefixs.component.html',
  styleUrls: ['./prefixs.component.css']
})
export class PrefixsComponent {

  prefix:PrefixCloudI; // The prefix edited actually
  delete:boolean = false; // Ask confirmation before deleting prefix

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
      this.prefix = this.get.prefixs[i];
      console.log(this.prefix);
    }
    addPrefif(){
      this.prefix = {
        id:'',
        prefix:'',
        schema:[],
        title:''
      }
    }
}
