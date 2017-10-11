/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Component
import { PageEchecAuthenticateComponent } from './PageEchecAuthenticate/pageEchecAuthenticate.component';

// Services
import { AuthGuard } from './Service';

/**
 * @module AppRoutingModule
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
  imports: [
    RouterModule.forRoot([
      { path: 'echec-authenticated', component: PageEchecAuthenticateComponent }
    ], { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
