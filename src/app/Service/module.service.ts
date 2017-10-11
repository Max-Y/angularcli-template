/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// Services
import { HttpService, AuthService } from '../Service';

// Models
import { ModuleEnum } from '../Models';

/**
 * @service ModuleService
 *
 * @stable
 */
interface IModuleService {
    /**
     * @interface IModuleService
     * 
     * @description
     */


    /**
     * @method accessAddress
     * used in pedagogy to set module is not reinscription
     */
    accessAddress(): Observable<boolean>
}
@Injectable()
export class ModuleService implements IModuleService {
     // Observable string sources
    private _addressAllowed = new Subject<Boolean>();
    private _currentModule = new Subject<ModuleEnum>();

    // Observable string streams
    addressAllowed$ = this._addressAllowed.asObservable();
    currentModule$ = this._currentModule.asObservable();
    
    private _urlReinscription: string = 'reinscription/access';


    constructor(private httpService: HttpService,
                private authService: AuthService) {
        this._addressAllowed.next(false);
    }

    /**
     * @method accessAddress
     */
    accessAddress(): Observable<boolean> {
        let currentModule = ModuleEnum.Address;
        this._currentModule.next(currentModule);
        this._addressAllowed.next(true);
        return Observable.of(true);
    }
}