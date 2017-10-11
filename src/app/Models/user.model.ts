/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */


/**
 * @class UserModel
 * model of student
 */
export class UserModel {
  constructor(
    public firstname: string,
    public lastname: string,
    public civility: string
  ) {  }

  getFullname() {
      return this.civility + ' ' + this.firstname + ' ' + this.lastname;
  }
}