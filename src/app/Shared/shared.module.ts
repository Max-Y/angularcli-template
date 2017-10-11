/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalModule, BsDropdownModule, AlertModule, TooltipModule, PopoverModule } from 'ng2-bootstrap';

// Components
import { DropdownComponent, DropdownModel } from './Dropdown';
import { ModalComponent } from './Modal';
import { FooterComponent } from './Footer';
import { LeaveButtonComponent } from './LeaveButton';


/**
 * @module SharedModule
 *
 * 
 * @description
 * SHaed component in all app
 */
@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
    AlertModule.forRoot(), 
    ModalModule.forRoot(), 
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot()
  ],
  declarations: [DropdownComponent, ModalComponent, FooterComponent, LeaveButtonComponent],
  exports: [
    DropdownComponent, 
    ModalComponent,
    FooterComponent,
    CommonModule, 
    FormsModule, 
    RouterModule, 
    BsDropdownModule,
    TooltipModule,
    PopoverModule,
    ModalModule, 
    AlertModule,
    LeaveButtonComponent
    ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule
    };
  }
}
