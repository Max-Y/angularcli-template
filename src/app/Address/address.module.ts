/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

// Modules
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AddressRoutingModule } from './address-routing.module';
import { SharedModule } from '../Shared/shared.module';

// Components
import { AddressComponent } from './address.component';
import { FormAddressComponent } from './FormAddress/formAddress.component';

// Services
import { AddressService, 
        CityService, 
        CountryService, 
        ContactInformationService
    } from './Service';

/**
 * @module AddressModule
 *
 * 
 * @description
 * Composed of AddressComponent and FormAddressComponent
 * Routing on AddressRoutingModule
 */
@NgModule({
  imports: [
    AddressRoutingModule,
    SharedModule.forRoot(),
    ],
  declarations: [
    AddressComponent, 
    FormAddressComponent
  ],
  exports: [
    AddressComponent, 
    FormAddressComponent, 
    AddressRoutingModule
  ]
})
export class AddressModule {
  static forRoot() : ModuleWithProviders {
    return {
      ngModule: AddressModule,
      providers: [  
        AddressService, 
        CityService, 
        CountryService, 
        ContactInformationService
    ]};
  }
}

