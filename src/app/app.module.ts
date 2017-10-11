/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { default as Config } from '../config';

// Components
import { AppComponent } from './app.component'
import { PageNotFoundComponent } from './PageNotFound/pageNotFound.component'
import { PageEchecAuthenticateComponent } from './PageEchecAuthenticate/pageEchecAuthenticate.component';
import { LeaveButtonComponent } from './Shared/LeaveButton/leaveButton.component';

// Module
import { AlertModule } from 'ng2-bootstrap';
import { SharedModule } from './Shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AddressModule } from './Address/address.module';

// Service
import { HttpService, 
        LayoutService, 
        AuthService,
        UserService, 
        ErrorService, 
        AuthGuard, 
        ModuleService,
        ReinscriptionGuard,
        ReinscriptionAfterStep3Guard,
        AddressGuard,
        PedagogyGuard,
      } from './Service';
import { AddressModuleService } from './Address';
   



/**
 * @module AppModule
 *
 * 
 * @description
 * Composed of hash '/#/'
 * Access on /#/ -> composed of ReinscriptionDescribeComponent
 * Access on /#/adresse -> composed of AddressComponent
 * 
 * Echec Auth -> composed of PageEchecAuthenticateComponent on /#/echec-authenticated
 * Other ressource -> composed of PageNotFoundComponent
 */
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PageEchecAuthenticateComponent  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    AddressModule.forRoot()
  ],
  providers: [{
      provide: APP_BASE_HREF,
      useValue: Config.APP_BASE
    },
    HttpService, 
    LayoutService,
    AuthService,
    AuthGuard,
    ReinscriptionGuard,
    ReinscriptionAfterStep3Guard,
    AddressGuard,
    PedagogyGuard,
    UserService,
    ModuleService,
    ErrorService,
    AddressModuleService
  ],
  exports: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
