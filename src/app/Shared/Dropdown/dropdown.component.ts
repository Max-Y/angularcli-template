/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { Component,Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DropdownValueModel } from './dropdown.model';


/**
 * @service DropdownComponent
 *
 * @stable
 */
interface IDropdownComponent {
    /**
     * @interface IDropdownComponent
     * 
     */


    /**
     * @method setDefaultTitle
     * Set default title of dropdown
     */
    setDefaultTitle(title: String)


    /**
     * @method setTitle
     * Set title of dropdown with the key of object selectec
     * Require dropdwon already init with an array<DropdownValueModel>
     */
    setTitle (key: any)


    /**
     * @method getChoice
     * Get the object selected in the dropdwon
     * The selected choose is put on title of dropdown
     */
    getChoice (): DropdownValueModel 


}
@Component({
  moduleId: module.id,
  selector: 'un-dropdown',
  templateUrl: './dropdown.component.html'
})
export class DropdownComponent implements IDropdownComponent {
  private _valid:Boolean = false;
  private _choice:DropdownValueModel;

  // DOM Elements
  @Input() public title:String;
  @Input() public items:Array<DropdownValueModel>;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
 


  constructor() {
  }


  /**
   * @method selectEvent
   * It's called when an object is selected on a dropdown 
   */
  selectEvent(event, value) {
    event.preventDefault();
    this.items.forEach(item => {
      if (item.value == value) {
        this._valid = true;
        this._choice = item;
        this.title = item.value;
        this.select.emit(item.key);
      }
    });
  }


  /**
   * @method setDefaultTitle
   */
  setDefaultTitle(title: string) {
  }


  /**
   * @method setTitle
   */
  setTitle (key: any) {
    this.items.forEach(item => {
      if (key === item.key) {
        this._choice = item;
        this.title = item.value;
      }
    });
  }


  /**
   * @method getChoice
   */
  getChoice () : DropdownValueModel {
    return this._choice;
  }
}