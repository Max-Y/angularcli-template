/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { PhoneEnum } from '../Models';
import { StatusEnum } from '../../Models';

/**
 * @class ContactInformationModel
 * Model of contact student
 */
export class ContactInformationModel {
  constructor(
    public numeroTelephone: string,
    public codeTypeTelephone: PhoneEnum | string,
    public status: StatusEnum | string
  ) {  }
}