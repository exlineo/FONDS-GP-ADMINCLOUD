import { Component, OnInit, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { UtilsService } from '../systeme/library/utils.service';
import { AuthService } from '../../extranet/systeme/services/auth.service';
import { CloudGetService } from '../systeme/services/cloud-get.service';

@Component({
	selector: 'app-notice',
	templateUrl: './notice.component.html',
	styleUrls: ['./notice.component.css'],

})
export class NoticeComponent implements OnInit, OnDestroy {
	@Input()
	idNotice: number | string;

	@Output()
	fermer = new EventEmitter<boolean>();
	update:boolean = false;

	constructor(public get:CloudGetService, public utils:UtilsService, private dom:DomSanitizer, public auth:AuthService) {
		// this.noticeServ.getNotice(this.idNotice);
	}

	ngOnInit() {
		console.log(this.idNotice);
		// this.noticeServ.getNotice(this.idNotice);
		// try{
		// 	this.noticeServ.getNotice(this.idNotice);
		// 	console.log("try");
		// }catch{
		// 	this.update = true;
		// 	this.noticeServ.notice = <NoticeModel>{}; // Créer une notice vide
		// }
		// console.log(this.noticeServ.notice);
	}
	ngOnDestroy(){
		// this.noticeServ.notice = <NoticeModel>{};
	}
}
