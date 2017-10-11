/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { StatusEnum } from '../../Models';

/**
 * @class AddressViewModel
 * ViewModel of address
 */
export class AddressViewModel {
  constructor(
    public addressName: string,
    public addressNumber: number,
    public additionalAddress: string,
    public locality: string,
    public zipCode: string,
    public city: string,
    public country: string,
    public numberPhone: string
  ) {  }
}