/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { Injectable }       from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';


// Services
import { ModuleService, AuthService }      from '../';


/**
 * @service AddressGuard
 *
 * @stable
 */
@Injectable()
export class AddressGuard implements CanActivate {

  constructor(private _moduleService: ModuleService,
  private _authService: AuthService) {}
  private _response: boolean;

  /**
   * @method canActivate
   * Surcharge canActivate to check the access of module address
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // Check if user is loggin
    if (this._authService.isLoggedIn) {
      // When access module address was already checked before
      if (this._response) {
        return Observable.of(this._response);
      }
      // Check the access module address
      else {
        return this._moduleService.accessAddress().map((res: boolean) => {
            this._response = res || false;
            return this._response;
          }, err => {
            return false;
          });
      }
    }
    // When user is not loggin
    else {
      // When access module address was already checked before
      if (this._response) {
        return Observable.of(this._response);
      }
      // When access module address is not set
      else {
        // Loggin the user
        return this._authService.initLogin()
          .map(res => {
            this._authService.isLoggedIn = true;
          }, err => { return false; })
          .flatMap((res: any) => {
            return this._moduleService.accessAddress()
              .map((res: boolean) => {
                this._response = res || false;
                return this._response;
              }, err => {
                return false;
              });
          });
      }
    }
  }
}