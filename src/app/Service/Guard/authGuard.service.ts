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
import { AuthService, ModuleService }      from '../';

/**
 * @service AuthGuard
 *
 * @stable
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService,
              private _moduleService: ModuleService,
              private _router:Router) {}

  /**
   * @method canActivate
   * Surcharge canActivate to check or set the loggin
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this._authService.isLoggedIn) {
      return Observable.of(true);
    }
    else {
      return this._authService.initLogin().map(
        (data: any) => { 
          this._authService.isLoggedIn = true;
          return true;
        },
         err => { return false;/*this._router.navigate(['/echec-authenticated']);*/ }
        );
    }
  }


  /**
   * @method canActivateChild
   * For children routes
   */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }
}