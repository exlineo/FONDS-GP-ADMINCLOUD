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

const routes: Routes = [
	{
		path: '', component: InterfaceComponent, children: [
			{ path: '', component:CollectionsComponent },
			{ path: 'notices', component:NoticesComponent },
			{ path: 'notice/:id', component:NoticeComponent},
			{ path: 'collections', component: CollectionsComponent },
			{ path: 'parametres', component:ParametresComponent},
			{ path:'profil', component:ProfilComponent},
			{ path: 'aide', loadChildren: () => import('./aide/aide.module').then(m => m.AideModule)},
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class IntranetRoutingModule { }
