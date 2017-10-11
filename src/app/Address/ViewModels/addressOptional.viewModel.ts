/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { StatusEnum } from '../../Models';
import { TypeAddressEnum } from '../Models';

/**
 * @class AddressOptionalViewModel
 * ViewModel of address optional
 */
export class AddressOptionalViewModel {
  constructor(
    public addressName: string,
    public addressNumber: number,
    public additionalAddress: string,
    public locality: string,
    public zipCode: string,
    public city: string,
    public country: string,
    public numberPhone: string,
    public receivingMail: TypeAddressEnum
  ) {  }
}