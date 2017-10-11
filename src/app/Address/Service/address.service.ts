/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';;

// Service
import { HttpService } from '../../Service';

// Model
import { AddressViewModel, AddressOptionalViewModel } from '../ViewModels';
import { AddressModel, TypeAddressEnum, ContactInformationModel } from '../Models';
import { StatusEnumHelper } from '../../Models';

/**
 * @service AddressService
 *
 * @stable
 */
interface IAddressService {
    /**
     * @interface IAddressService
     *
     */


    /**
     * @method setAddress
     * set an {@link AddressViewModel} and an {@link AddressOptionalViewModel} to a array of {@link AddressModel}
     */
    setAddress(address: AddressViewModel, addressOptional?: AddressOptionalViewModel)


    /**
     * @method getAddressModel
     * Submit all data from address
     * Only used in address module
     * return Observable
     */
    getAddressModel(): Array<AddressModel>


    /**
     * @method getAddressViewModel
     * return Observable of {@link AddressViewModel}
     */
    getAddressViewModel(): AddressViewModel


    /**
     * @method getAddressOptionalViewModel
     * return Observable of {@link AddressOptionalViewModel}
     */
    getAddressOptionalViewModel(): AddressOptionalViewModel


    /**
     * @method setHaveAddressOptional
     * set if there is a address of type YEARLY
     */
    setHaveAddressOptional(isOptional: Boolean)


    /**
     * @method haveOptionalAddress
     * return if there is a address of type YEARLY
     */
    haveOptionalAddress(): Boolean
}
@Injectable()
export class AddressService implements IAddressService {
    private _addresses: Array<AddressModel>;
    private _address: AddressModel;
    private _addressOptional: AddressModel;
    private _haveAddressOptional: Boolean;
    private _typeAddress: TypeAddressEnum;
    private _defaultCountry: string = '100';
    private _optional: string = 'OPTIONNEL';
    private _fix: string = 'FIXE';


    constructor(private httpService: HttpService) {
    }


    /**
     * @method init
     */
    init(result: any) {
        this._addresses = Array();
        this._haveAddressOptional = false;

        switch (result.codeTypeAdresse) {
            // If address is a type FIX
            case  this._fix:
                this._typeAddress = TypeAddressEnum.Fix;
                break;
            // If address is a type YEARLY
            case this._optional:
                this._typeAddress = TypeAddressEnum.Optional;
                break;
            default:
                this._typeAddress = TypeAddressEnum.Fix;
        }

        result.adresses.forEach(address => {
            let type: TypeAddressEnum;
            let newAddress: AddressModel;

            if (address) {
                newAddress = new AddressModel(
                    address.voie,
                    address.numVoie,
                    address.complement,
                    address.localite,
                    address.codePostal,
                    address.codePostalEtranger,
                    address.ville,
                    address.codePays,
                    address.numeroTelephone,
                    address.codeTypeAdresse,
                    address.status
                );

                // if address is a type YEARLY
                if (address.codeTypeAdresse ===  this._optional) {
                    this._addressOptional = newAddress;
                    this._haveAddressOptional = true;
                }
                else {
                    this._address = newAddress;
                }
                this._addresses.push(newAddress);
            }
        });
        return this._addresses;
    }


    /**
     * @method getAddressModel
     */
    getAddressModel(): Array<AddressModel> {
        return this._addresses;
    }


    /**
     * @method getTypeAddress
     */
    getTypeAddress(): string {
        switch (this._typeAddress) {
            // If address is a type FIX
            case TypeAddressEnum.Fix:
                return this._fix;
            // If address is a type YEARLY
            case TypeAddressEnum.Optional:
                return this._optional;
            default:
                return this._fix;
        }
    }

    /**
     * @method setAddress
     */
    setAddress(address: AddressViewModel, addressOptional?: AddressOptionalViewModel) {
        this._addresses = Array();

        // An address of type FIX
        let tmpAddress = new AddressModel(
            address.addressName,
            address.addressNumber ? address.addressNumber : null,
            address.additionalAddress,
            address.locality,
            address.country === this._defaultCountry ? address.zipCode : null,
            address.country === this._defaultCountry ? null : address.zipCode,
            address.city,
            address.country,
            address.numberPhone,
            this._fix,
            this._address.status
        );

        let statusAddress = StatusEnumHelper.checkModified(this._address, tmpAddress);
        tmpAddress.status = statusAddress;
        this._address = tmpAddress;
        this._addresses.push(this._address);

        // An address of type YEARLY
        if (this._haveAddressOptional || this._addressOptional) {
            let tmpAddressOptional = new AddressModel(
                addressOptional.addressName,
                addressOptional.addressNumber ? addressOptional.addressNumber : null,
                addressOptional.additionalAddress,
                addressOptional.locality,
                addressOptional.country === this._defaultCountry ? addressOptional.zipCode : null,
                addressOptional.country === this._defaultCountry ? null : addressOptional.zipCode,
                addressOptional.city,
                addressOptional.country,
                addressOptional.numberPhone,
                this._optional,
                null
            );
            let statusAddressOptional = this._haveAddressOptional ? (this._addressOptional ? 
                                        (this._addressOptional.status ? StatusEnumHelper.checkModified(this._addressOptional, tmpAddressOptional) : 'NEW') :  'NEW') : 'DELETED';
            tmpAddressOptional.status = statusAddressOptional;
            this._addressOptional = tmpAddressOptional;

            this._typeAddress = addressOptional.receivingMail;
            this._addresses.push(this._addressOptional);
        }
    }


    /**
     * @method getAddressViewModel
     */
    getAddressViewModel(): AddressViewModel {
        if (this._address) {
            return new AddressViewModel(
                this._address.voie,
                this._address.numVoie,
                this._address.complement,
                this._address.localite,
                this._address.codePostal || this._address.codePostalEtranger,
                this._address.ville,
                this._address.codePays,
                this._address.numeroTelephone
            );
        }
        return null;
    }


    /**
     * @method getAddressOptionalViewModel
     */
    getAddressOptionalViewModel(): AddressOptionalViewModel {
        if (this._addressOptional) {
            return new AddressOptionalViewModel(
                this._addressOptional.voie,
                this._addressOptional.numVoie,
                this._addressOptional.complement,
                this._addressOptional.localite,
                this._addressOptional.codePostal || this._addressOptional.codePostalEtranger,
                this._addressOptional.ville,
                this._addressOptional.codePays,
                this._addressOptional.numeroTelephone,
                this._typeAddress
            );
        }
        return null;
    }


    /**
     * @method setHaveAddressOptional
     */
    setHaveAddressOptional(isOptional: Boolean) {
        this._haveAddressOptional = isOptional;
    }


    /**
     * @method haveOptionalAddress
     */
    haveOptionalAddress(): Boolean {
        return this._haveAddressOptional;
    }
}