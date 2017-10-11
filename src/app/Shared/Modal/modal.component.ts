/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { Component,Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';


/**
 * @service ModalComponent
 *
 * @stable
 */
interface IModalComponent {
    /**
     * @interface IModalComponent
     * 
     * 
     */


    /**
     * @method show
     * Called when modal is launch
     */
    show()


    /**
     * @method hide
     * Called when modal is left
     */
    hide()


    /**
     * @method isOpen
     * Boolean to know if the modal is opened
     */
    isOpen(): Boolean

}
@Component({
  moduleId: module.id,
  selector: 'un-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements IModalComponent {
  @ViewChild('modal') private _modal:ModalDirective;
  @Output() action: EventEmitter<any> = new EventEmitter<any>();
  @Input() public title:string;
  private _isOpen: Boolean;

  constructor() {
    this._isOpen = false;
  }


  /**
   * @method show
   */
  show() {
    this._isOpen = true;
    this._modal.show();
    this.action.emit(this._isOpen);
  }


  /**
   * @method hide
   */
  hide() {
    this._isOpen = false;
    this._modal.hide();
    this.action.emit(this._isOpen);
  }


  /**
   * @method isOpen
   */
  isOpen(): Boolean {
    return this._isOpen;
  }
}