// Angular Library
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Authentication Guard
import { AuthGuard } from './extranet/systeme/services/auth.guard';

// Component
import { ExtranetComponent } from './extranet/extranet.component';
import { ConnexionComponent } from './extranet/connexion/connexion.component';

import { Erreur404Component } from './extranet/erreur/erreur404.component';
import { InscriptionComponent } from './extranet/inscription/inscription.component';

// Rooting
const routes: Routes = [
	{ path: '', component: ExtranetComponent, children:[
		{ path: '', component: ConnexionComponent },
		{ path: 'connexion', component: ConnexionComponent },
		{ path: 'inscription', component: InscriptionComponent }
	]},
	// { path: 'intranet', loadChildren: () => import('./intranet/intranet.module').then(m => m.IntranetModule), canLoad: [AuthGuard] },
	{ path: 'intranet', loadChildren: () => import('./intranet/intranet.module').then(m => m.IntranetModule), canLoad: [AuthGuard], canActivate:[AuthGuard] },
	{ path: '**', component: Erreur404Component },
	{ path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
