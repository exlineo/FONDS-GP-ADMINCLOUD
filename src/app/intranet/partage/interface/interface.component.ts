import { Component, OnInit } from '@angular/core';
import { CloudGetService } from '../../systeme/services/cloud-get.service';

@Component({
	selector: 'app-interface',
	templateUrl: './interface.component.html',
	styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {

	constructor(public get:CloudGetService) { }

	ngOnInit() {
	}

}
