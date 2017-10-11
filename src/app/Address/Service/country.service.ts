/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { Injectable } from '@angular/core'

import { HttpService } from '../../Service';
import { Observable } from 'rxjs/Observable';;

import { DropdownValueModel } from '../../Shared';

/**
 * @service CountryService
 *
 * @stable
 */
interface ICountryService {
    /**
     * @interface ICountryService
     *
     */

     /**
     * @method getDropdownCountry
     * return Observable of an array of country
     */
      getDropdownCountry() : Observable<any>
}
@Injectable()
export class CountryService implements ICountryService {
    private _countries: Array<DropdownValueModel>;
    private _url: string = 'adresse/pays';
    private _defaultCountryDropdown: string = '100';


    constructor(private httpService: HttpService) {
    }
    

    /**
     * @method getDropdownCountry
     * return Observable of an array of country
     */
    getDropdownCountry() : Observable<any> {
        let defaultCountry;

        // if countries is already know, you return countries set
        if (this._countries) {
            return Observable.of(this._countries);
        }

        // else ressource is called at url: {@link _url}
        else {
            return this.httpService.get(this._url).map((res) => {
                this._countries = Array();
                let result = JSON.parse(res.body.toString());
                result.forEach(country => {
                    // select default country
                    if (country['code'] === this._defaultCountryDropdown) {
                        // convert in DropdownValueModel
                        defaultCountry = new DropdownValueModel(country['code'], country['libelle']);
                    }
                    else {
                        // convert in DropdownValueModel
                        this._countries.push(new DropdownValueModel(country['code'], country['libelle']));
                    }
                });

                if (defaultCountry) {
                    this._countries.unshift(defaultCountry);
                }

                // return an array of DropdownValueModel
                return this._countries;
            });
        }
    }
}