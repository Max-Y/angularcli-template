/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { Component, Inject } from '@angular/core';

// Service
import { LayoutService } from '../Service';

/**
 * @Component PageNotFoundComponent
 *
 * @stable
 */
interface IPageNotFoundComponent {
    /**
     * @interface IPageNotFoundComponent
     *
     */
}
@Component({
  moduleId: module.id,
  selector: 'un-pagenotfound',
  templateUrl: './pageNotFound.component.html'
})
export class PageNotFoundComponent implements IPageNotFoundComponent {
  constructor(@Inject(LayoutService) _layoutService: LayoutService) {
    _layoutService.initPageNotFound();
  }
}