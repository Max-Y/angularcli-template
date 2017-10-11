/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { LayoutService, AuthService, ModuleService } from './Service';
import { AddressModuleService } from './Address';

// Models
import { ModuleEnum } from './Models';


/**
 * @service AppComponent
 *
 * @stable
 */
interface IAppComponent {
  /**
   * @interface IAppComponent
   * 
   * 
   * @description
   * Launch in index.html
   * It's the first component called in the APP
   */
}
@Component({
  moduleId: module.id,
  selector: 'un-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements IAppComponent {
  public _title: String;
  public _altImgTitle: String;
  public _srcImgTitle: String;
  public _text: String;
  public _secondText: String;

  // Used to know if you are loggin
  private _loggedIn: Boolean = false;

  public authorized: Boolean = false;



  constructor(private _authService: AuthService,
    private _router: Router,
    private _moduleService: ModuleService,
    private _addressModuleService: AddressModuleService,
    @Inject(LayoutService) _layoutService: LayoutService) {

    /**
     * Set the layout
     * Depend of :
     * - Wich module is called (address, pedagogy or reisncription)
     * - if you are deconnected
     * - if you are allow to access
     * - if you are on an exist page (error 404)
     */
    _layoutService.title$.subscribe(
      title => {
        this._title = title;
      });

    _layoutService.altImgTitle$.subscribe(
      altImgTitle => {
        this._altImgTitle = altImgTitle;
      });

    _layoutService.srcImgTitle$.subscribe(
      srcImgTitle => {
        this._srcImgTitle = srcImgTitle;
      });



    /**
     * Check if you are loggin
     * Or show an error
     */
    _authService.loggedIn$.subscribe(
      res => {
        this._loggedIn = res;
        this.authorized = res;
        if (!res) {
          this._text = 'Le service d\'authentification ne répond pas ! Nous sommes désolés de ce désagrément, réessayez plus tard.';
          this._title = 'Problème d\'authentification';
          this._altImgTitle = 'Problème d\'authentification';
          this._srcImgTitle = '/assets/sheets.png';
        }
      });


    /**
     * Selected the current module
     */
    _moduleService.currentModule$.subscribe(
      module => {
        switch (module) {
          case ModuleEnum.Address:
            this.checkAddressAllowed();
            break;
          default:
            this.checkAddressAllowed();
        }
      });
  }


  /**
   * @method checkAddressAllowed
   */
  private checkAddressAllowed() {
    this._moduleService.addressAllowed$.subscribe(
      res => {
        this.authorized = this._loggedIn;

    console.log('APP');
        this._addressModuleService.init().subscribe(res => {}, err => { 
            this._title = 'Adresse : Service indisponible';
            this._altImgTitle = 'Service Adresse indisponible ! Nous sommes désolés de ce désagrément, réessayez plus tard.';
            this._srcImgTitle = '/assets/sheets.png';
        });
      });
  }
}
