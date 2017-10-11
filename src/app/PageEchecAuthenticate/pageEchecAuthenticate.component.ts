/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { Component, Inject } from '@angular/core';

// Service
import { LayoutService } from '../Service';

/**
 * @Component PageEchecAuthenticateComponent
 *
 * @stable
 */
interface IPageEchecAuthenticateComponent {
    /**
     * @interface IPageEchecAuthenticateComponent
     *
     */
}
@Component({
  moduleId: module.id,
  selector: 'un-pageechec-authenticate',
  templateUrl: './pageEchecAuthenticate.component.html'
})
export class PageEchecAuthenticateComponent implements IPageEchecAuthenticateComponent {
  constructor(@Inject(LayoutService) _layoutService: LayoutService) {
    _layoutService.initEchecAuthenticate();
  }
}