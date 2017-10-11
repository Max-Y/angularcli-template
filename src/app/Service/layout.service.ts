/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


/**
 * @service LayoutService
 *
 * @stable
 */
interface ILayoutService {
    /**
     * @interface ILayoutService
     * 
     * 
     */


    /**
     * @method setTitle
     * Set title in layout
     */
    setTitle(title: String) 


    /**
     * @method setAltImg
     * Set description of img in layout
     */
    setAltImg(altImgTitle: String)


    /**
     * @method setSrcImg
     * Set source of img in layout
     */
    setSrcImg(srcImgTitle: String)


    /**
     * @method initAddress
     * Initiliaze layout when you cannot access on address module
     */
    initAddress()


    /**
     * @method initPageNotFound
     * Initiliaze layout when ressource is not found
     */
    initPageNotFound()


    /**
     * @method initEchecAuthenticate
     * Initiliaze layout when user is not logged
     */
    initEchecAuthenticate()
}
@Injectable()
export class LayoutService implements ILayoutService {
    // Observable string sources
    private _title = new Subject<String>();
    private _altImgTitle = new Subject<String>();
    private _srcImgTitle = new Subject<String>();

    // Observable string streams
    title$ = this._title.asObservable();
    altImgTitle$ = this._altImgTitle.asObservable();
    srcImgTitle$ = this._srcImgTitle.asObservable();


    /**
     * @method setTitle
     */
    setTitle(title: String) {
        this._title.next(title);
    }


    /**
     * @method setAltImg
     */
    setAltImg(altImgTitle: String) {
        this._altImgTitle.next(altImgTitle);
    }


    /**
     * @method setSrcImg
     */
    setSrcImg(srcImgTitle: String) {
        this._srcImgTitle.next(srcImgTitle);
    }

    /**
     * @method initAddress
     */
    initAddress() {
        this.setTitle('Changement d\'adresse');
        this.setAltImg('Changement d\'adresse');
        this.setSrcImg('/assets/sheets.png');
    }


    /**
     * @method initPageNotFound
     */
    initPageNotFound() {
        this.setTitle('Page introuvable');
        this.setAltImg('Page introuvable');
        this.setSrcImg('/assets/sheets.png');
    }


    /**
     * @method initEchecAuthenticate
     */
    initEchecAuthenticate() {
        this.setTitle('Problème d\'authentification');
        this.setAltImg('Problème d\'authentification');
        this.setSrcImg('/assets/sheets.png');        
    }
}