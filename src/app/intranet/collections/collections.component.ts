import { Component, OnInit } from '@angular/core';
import { useAnimation, transition, trigger, style, animate, state } from '@angular/animations';
import { CollectionModel } from '../systeme/modeles/collection.modele';
import { NoticeModel } from '../systeme/modeles/notice.modele';
import { CollectionService } from '../systeme/services/collection.service';

@Component({
	selector: 'app-collections',
	templateUrl: './collections.component.html',
	styleUrls: ['./collections.component.css'],
	animations: [
		trigger('openCloseLeftPanel', [
			state('open', style({
				width: '200px'
			})),
			state('closed', style({
				width: '0'
			})),
			transition('open => closed', [
				animate('0.5s')
			]),
			transition('closed => open', [
				animate('0.5s')
			]),
		]),
		trigger('openCloseRightPanel', [
			state('open', style({
				width: '50%'
			})),
			state('closed', style({
				width: '0'
			})),
			transition('open => closed', [
				animate('0.5s')
			]),
			transition('closed => open', [
				animate('0.5s')
			]),
		]),
	],
})
export class CollectionsComponent implements OnInit {

	collectionListe: CollectionModel[] = [];
	noticeSelection: NoticeModel[] = [];
	collectionElement: CollectionModel;
	collectionAffiche: boolean = false;

	leftPanelIsOpen = true;
	rightPanelIsOpen = true;

	constructor(public collectionService: CollectionService) { }

	ngOnInit() {
		this.collectionService.readCollections().subscribe(
			data => {
				this.collectionListe = data;
				this.collectionOnClick(0);
			}
		);
	}

	collectionOnClick(idCollection): void {
		this.collectionElement = this.collectionListe[idCollection];
		this.noticeSelection = this.collectionElement.notices;
		this.collectionAffiche = true;
	}

	noticeOnClick($event, idNotice): void {
		$event.preventDefault();
		
		alert('yolo');
	}


	toggleLeftPanel($event): void {
		$event.preventDefault();
		this.leftPanelIsOpen = !this.leftPanelIsOpen;
	}

	toggleRightPanel($event): void {
		$event.preventDefault();
		this.rightPanelIsOpen = !this.rightPanelIsOpen;
	}
}
