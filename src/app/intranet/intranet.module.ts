// Angular Library
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Extern Library
import { MaterialModule } from 'src/app/library/material-module';

// Rooting
import { IntranetRoutingModule } from "./intranet-routing.module";

// Component
import { SidenavComponent } from 'src/app/intranet/partage/sidenav/sidenav.component';
import { OptionPopInComponent } from 'src/app/intranet/partage/option-pop-in/option-pop-in.component';

import { NoticeComponent } from './notice/notice.component';
import { CollectionComponent } from './collection/collection.component';
import { NoticesComponent } from './notices/notices.component';
import { CollectionsComponent } from './collections/collections.component';

import { FiltrePipe } from './systeme/pipes/filtre.pipe';
import { UtilsService } from './systeme/library/utils.service';
import { FiltreNoticesPipe } from './systeme/pipes/filtre-notices.pipe';
import { ParametresComponent } from './partage/parametres/parametres.component';
import { NotificationService } from '../extranet/systeme/services/notification.service';
import { ProfilComponent } from './partage/profil/profil.component';
import { CloudGetService } from './systeme/services/cloud-get.service';
import { CloudEditService } from './systeme/services/cloud-edit.service';
import { InterfaceComponent } from './partage/interface/interface.component';
import { ScanComponent } from './scan/scan.component';

@NgModule({
	imports: [
		CommonModule,
		IntranetRoutingModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		UtilsService,
		NotificationService,
    CloudGetService,
    CloudEditService
	],
	declarations: [
		SidenavComponent,
    InterfaceComponent,
		OptionPopInComponent,
		NoticeComponent,
		CollectionComponent,
		NoticesComponent,
		CollectionsComponent,
		FiltrePipe,
		FiltreNoticesPipe,
		ParametresComponent,
		ProfilComponent,
  ScanComponent
	],
	entryComponents: [OptionPopInComponent]
})
export class IntranetModule { }
