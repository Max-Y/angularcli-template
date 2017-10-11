/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Components
import { AddressComponent } from './address.component';

// Services
import { AddressGuard } from '../Service';

/**
 * @module AddressRoutingModule
 *
 * 
 * @description
 * Access on /#/adresse -> composed of AddressComponent
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'adresse', component: AddressComponent,  canActivate: [AddressGuard] }
    ])
  ],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
 