/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { StatusEnum } from '../../Models';

/**
 * @enum TypeAddressEnum
 * used to know if address is a fixed address or a yearly address
 */
export enum TypeAddressEnum {
    Fix = 1 ,
    Optional = 2
}

/**
 * @class AddressModel
 * Model of each address
 */
export class AddressModel {
  constructor(
    public voie: string,
    public numVoie: number,
    public complement: string,
    public localite: string,
    public codePostal: string,
    public codePostalEtranger: string,
    public ville: string,
    public codePays: string,
    public numeroTelephone: string,
    public codeTypeAdresse: string,
    public status: string
  ) {  }
}