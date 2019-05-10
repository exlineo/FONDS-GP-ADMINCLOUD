// Angular Library
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Extern Library
import { MaterialModule } from './library/material-module';

// Rooting
import { AppRoutingModule } from './app-routing.module';

// Component
import { AppComponent } from './app.component';
import { ConnexionComponent } from './extranet/connexion/connexion.component';
import { Erreur404Component } from './extranet/erreur/erreur404.component';
import { InscriptionComponent } from './extranet/inscription/inscription.component';

// Service
import { AuthService } from "./extranet/systeme/services/auth.service";
import { TokenService } from './extranet/systeme/services/token.service';
import { NotificationService } from "./extranet/systeme/services/notification.service";

import { AuthIntercepteur } from "./extranet/systeme/services/auth.intercepteur";
import { SecuriteIntercepteur } from './extranet/systeme/services/securite.intercepteur';

@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		AppComponent,
		ConnexionComponent,
		Erreur404Component,
		InscriptionComponent
	],
	providers: [AuthService, TokenService, NotificationService, { provide: HTTP_INTERCEPTORS, useClass: AuthIntercepteur, multi: true }, , { provide: HTTP_INTERCEPTORS, useClass:SecuriteIntercepteur, multi:true}],
	bootstrap: [AppComponent]
})
export class AppModule { }
