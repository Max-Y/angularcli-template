/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { Component, Inject, ViewChild } from '@angular/core';
import {Observable} from "rxjs/Observable";

// Services
import { LayoutService, UserService } from '../Service';
import {  AddressModuleService } from '../Address/Service';

// Component
import {  FormAddressComponent } from '../Address/';


/**
 * @Component FormAddressComponent
 *
 * @stable
 */
interface IAddressComponent {
    /**
     * @interface IAddressComponent
     *
     * 
     * @description
     * 
     * Only used for access to an address of student
     * NOT USED in reisncription module
     * 
     * Service used:
     * - LayoutService
     * - UserService
     *
     */

    /**
     * @method error
     * Handle when an error was catch when a request was sent
     */
     error(errorTitle: String);
}
@Component({
  moduleId: module.id,
  selector: 'un-address',
  templateUrl: './address.component.html'
})
export class AddressComponent implements IAddressComponent {
  public _fullname: String;

  // Used to wait the initialize of data
  public  even$: Observable<boolean>;

  @ViewChild('formAdress') private _view:FormAddressComponent;

  constructor(@Inject(LayoutService) _layoutService: LayoutService,
            private _userService: UserService,
            private _addressModuleService:AddressModuleService) {
     _layoutService.initAddress();
  }

  ngOnInit(): void {
    this.even$ = this._addressModuleService.even$;
    console.log('AddressComponent');

    this._addressModuleService.eventWait$.subscribe(res => {
      this._fullname = this._userService.getUserModel().getFullname();
    });
  }

  /**
   * @method error
   */
  error(errorTitle: String) {
    console.debug("HTTP SERVICE", errorTitle);
  }


  /**
   * @method submit
   */
  submit() {
    this._view.submitAddress();
  }
}