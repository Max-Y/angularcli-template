/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

// Service
import { AddressService, ContactInformationService } from '.';
import { HttpService, UserService } from '../../Service';

// Model
import { AddressModel, TypeAddressEnum, ContactInformationModel } from '../Models';
import { StatusEnum } from '../../Models';


/**
 * @service AddressModuleService
 *
 * @stable
 */
interface IAddressModuleService {
    /**
     * @interface IAddressModuleService
     *
     */


    /**
     * @method getAddress
     * return Observable if service send an error
     */
    init(): Observable<any>


     /**
     * @method submit
     * return Observable if service send an error
     */
    submit(): Observable<any>
}
@Injectable()
export class AddressModuleService implements IAddressModuleService {
    private _url: string = 'adresse/etudiant';
    private _isCalled: Boolean;
    public  even$: Observable<boolean>;
    
    private _eventWait = new Subject<Boolean>();
    eventWait$ = this._eventWait.asObservable();


    constructor(private _httpService: HttpService,
                private _addressService: AddressService,
                private _contactInformationService: ContactInformationService,
                private _userService: UserService) {
        this._isCalled = false;
        this._eventWait.next(false);
    }


    /**
     * @method getAddress
     * return Observable if service send an error
     */
    init(): Observable<boolean> {
        if (!this._isCalled) {
            return this._httpService.get(this._url).map((res) => {
                let result = JSON.parse(res.body.toString());
                this._userService.init(result);
                this._contactInformationService.init(result);
                this._contactInformationService.init(result);
                this._addressService.init(result);
                this._isCalled = true;
                this._eventWait.next(true);
                this.even$ = Observable.of(true);
                return true
            }, err => { this.even$ = Observable.of(false); return false;});
        }
        return Observable.of(true);
    }


    /**
     * @method submit
     * return Observable if service send an error
     */
    submit(): Observable<any> {
        let mail:string = this._contactInformationService.getEmail();
        let address: Array<AddressModel> = this._addressService.getAddressModel();
        let typeAddress: string = this._addressService.getTypeAddress();
        let contactInformation:Array<ContactInformationModel>  = this._contactInformationService.getContactInformationModel();
        return this._httpService.post(this._url, {"adresseMail": mail, "adresses": address, "codeTypeAdresse": typeAddress, "telephones": contactInformation});
    }
}