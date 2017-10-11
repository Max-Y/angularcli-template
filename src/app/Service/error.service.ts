/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


/**
 * @service ErrorService
 *
 * @stable
 */
interface IErrorService {
    /**
     * @interface IErrorService
     * 
     * 
     */


    /**
     * @method setError
     * Set error
     */
    setError(error: String)


    /**
     * @method getError
     * Return current error
     */
    getError(): String


    /**
     * @method next
     * Called after get an error, to access of every error in different step
     */
    next() 
}
@Injectable()
export class ErrorService implements IErrorService {
    // Observable string sources
    private _error: String;


    /**
     * @method setError
     */
    setError(error: String) {
        this._error = error;
    }


    /**
     * @method getError
     */
    getError(): String {
        return this._error;
    }


    /**
     * @method next
     */
    next() {
        this._error = null;
    }
}