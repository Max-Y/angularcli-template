/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */


/**
 * @class DropdownValueModel
 * model of object in dropdown
 */
export class DropdownValueModel {
  constructor(
    public key: any,
    public value: string
  ) {  }
}


/**
 * @class DropdownModel
 * model of dropdown
 */
export class DropdownModel {
  constructor(
    public dropdown: Array<DropdownValueModel>
  ) {  }
}