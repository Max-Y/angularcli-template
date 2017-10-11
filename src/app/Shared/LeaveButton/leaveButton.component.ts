/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { Component, ViewChild } from '@angular/core';
import { environment } from "../../../environments/environment";

// Component
import { ModalComponent } from "../../Shared";


/**
 * @service LeaveButtonComponent
 *
 * @stable
 */
interface ILeaveButtonComponent {
    /**
     * @interface ILeaveButtonComponent
     * 
     * 
     */


      /**
       * @method actionModal
       * Called when modal is launch or leave
       * 
       */
      actionModal(isOpen: Boolean)


      /**
       * @method leave
       * Called when leave button is pressed
       */
      leave() 
}
@Component({
  moduleId: module.id,
  selector: 'un-leave-button',
  templateUrl: './leaveButton.component.html'
})
export class LeaveButtonComponent implements ILeaveButtonComponent {
  public isOpen: Boolean = false;

  // Component Dropown
  @ViewChild('modal') private _modal:ModalComponent;


  /**
   * @method actionModal
   */
  actionModal(isOpen: Boolean) {
    this.isOpen = isOpen;
  }


  /**
   * @method leave
   */
  leave() {
    window.location.href = environment.backUri;
  }
}