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
import { PhoneAndMailViewModel } from '../ViewModels';
import { ContactInformationModel } from '../Models';
import { StatusEnumHelper } from '../../Models';

/**
 * @service ContactInformationService
 *
 * @stable
 */
interface IContactInformationService {
    /**
     * @interface IContactInformationService
     *
     */

    /**
     * @method initContactInformation
     * initialize data user in ContactInformationModel
     */
     init(contactInformation: any)


    /**
     * @method setContactInformation
     * Set PhoneAndMailViewModel in ContactInformationModel
     * Allow, after the navigation, keep the data of ContactInformationModel
     */
      setContactInformation(contactInformation: PhoneAndMailViewModel)


    /**
     * @method getContactInformationViewModel
     * return an Observable of PhoneAndMailViewModel
     */
      getContactInformationViewModel(): PhoneAndMailViewModel


    /**
     * @method getContactInformationModel
     * return an ContactInformationModel
     */
      getContactInformationModel(): Array<ContactInformationModel>
}
@Injectable()
export class ContactInformationService implements IContactInformationService {
    private _contactInformation: ContactInformationModel;
    private _phones: Array<ContactInformationModel>;
    private _ceilPhone: string;
    private _businessPhone: string;
    private _mail: string;


    constructor(private httpService: HttpService) {
    }


    /**
     * @method init
     */
    init(contactInformation: any) {
        this._phones = Array();
        let havePF = false;
        let havePT = false;

        this._mail = contactInformation.adresseMail;
        contactInformation.telephones.forEach(telephone => {
            if (telephone.codeTypeTelephone === 'PF') {
                havePF = true;
                this._businessPhone = telephone.numeroTelephone;
                this._phones.push(new ContactInformationModel(
                    telephone.numeroTelephone,
                    telephone.codeTypeTelephone,
                    telephone.status
                ));
            }
            else if (telephone.codeTypeTelephone === 'PT')  {
                havePT = true;
                this._ceilPhone = telephone.numeroTelephone;
                this._phones.push(new ContactInformationModel(
                    telephone.numeroTelephone,
                    telephone.codeTypeTelephone,
                    telephone.status
                ));
            }
        });
        if (!havePF) {
            this._phones.push(new ContactInformationModel(
                    null,
                    'PF',
                    'NEW'
                ));
        }

        if (!havePT) {
            this._phones.push(new ContactInformationModel(
                    null,
                    'PT',
                    'NEW'
                ));
        }
    }


    /**
     * @method setContactInformation
     */
    setContactInformation(contactInformation: PhoneAndMailViewModel) {
        this._mail = contactInformation.mailAddress;
        this._phones.forEach(phone => {
            // Check type of phone
            switch(phone.codeTypeTelephone) {
                case "PT" :
                    phone.numeroTelephone = contactInformation.ceilPhone;
                    phone.status = StatusEnumHelper.checkModified(this._ceilPhone, contactInformation.ceilPhone);
                    this._ceilPhone = contactInformation.ceilPhone;
                    break;
                case "PF" :
                    phone.numeroTelephone = contactInformation.businessPhone;
                    phone.status = StatusEnumHelper.checkModified(this._businessPhone, contactInformation.businessPhone);
                    this._businessPhone = contactInformation.businessPhone;
                    break;
            }
        });
    }


    /**
     * @method getContactInformationViewModel
     */
    getContactInformationViewModel(): PhoneAndMailViewModel {
        // return an PhoneAndMailViewModel
        return new PhoneAndMailViewModel(
            this._mail,
            this._ceilPhone,
            this._businessPhone
        );
    }


    /**
     * @method getContactInformationModel
     */
    getContactInformationModel(): Array<ContactInformationModel> {
        return this._phones;
    }


    /**
     * @method getEmail
     */
    getEmail(): string {
        return this._mail;
    }
}