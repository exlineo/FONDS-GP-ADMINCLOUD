// Angular Library
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Page Component
import { InterfaceComponent } from './partage/interface/interface.component';

import { NoticeComponent } from './notice/notice.component';
import { NoticesComponent } from './notices/notices.component';
import { CollectionsComponent } from './collections/collections.component';
import { ParametresComponent } from './partage/parametres/parametres.component';
import { ProfilComponent } from './partage/profil/profil.component';
import { ScanComponent } from './scan/scan.component';
import { CollectionComponent } from './collection/collection.component';
import { PrefixsComponent } from './prefixs/prefixs.component';

const routes: Routes = [
	{
		path: '', component: InterfaceComponent, children: [
			{ path: '', component:CollectionsComponent },
			{ path: 'notices', component:NoticesComponent },
			{ path: 'notice/:id', component:NoticeComponent},
			{ path: 'collections', component: CollectionsComponent },
			{ path: 'collection:id', component: CollectionComponent },
      { path: 'scan', component:ScanComponent},
			{ path: 'prefixs', component:PrefixsComponent },
			{ path: 'parameters', component:ParametresComponent},
			{ path: 'profil', component:ProfilComponent},
			{ path: 'help', loadChildren: () => import('./aide/aide.module').then(m => m.AideModule)},
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class IntranetRoutingModule { }
