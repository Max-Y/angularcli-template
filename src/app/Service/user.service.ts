/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';;

// Service
import { HttpService } from './';

// Model
import { UserModel } from '../Models';


/**
 * @service UserService
 *
 * @stable
 */
interface IUserService {
    /**
     * @interface IUserService
     * 
     * 
     */


    /**
     * @method init
     * Initiliaze of user
     */
    init(user: any)


    /**
     * @method getUserModel
     * return an user
     */
    getUserModel(): UserModel

}
@Injectable()
export class UserService implements IUserService  {
    private _user: UserModel;


    constructor(private httpService: HttpService) {
    }


    /**
     * @method init
     */
    init(user: any) {
        this._user = new UserModel(
            user.prenom,
            user.patronyme,
            user.codeCivilite
        );
    }


    /**
     * @method getUserModel
     */
    getUserModel(): UserModel {
        return this._user;
    }
}