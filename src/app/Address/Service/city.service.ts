/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Service
import { HttpService } from '../../Service';

// Model
import { DropdownValueModel } from '../../Shared';


/**
 * @service CityService
 *
 * @stable
 */
interface ICityService {
    /**
     * @interface ICityService
     *
     */

    /**
    * @method getDropdownCity
    * return Observable of an array of cities who match with zipcode sent
    */
    getDropdownCity(zipcode: string): Observable<any>;
}
@Injectable()
export class CityService implements ICityService {
    private _cities: Array<DropdownValueModel>;
    private _url: string = 'adresse/communes';
    private _zipcode: string;


    constructor(private httpService: HttpService) {
    }

    /**
     * @method onlyUnique
     * Return -1 if the value is not find
     */
    private onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }


    /**
     * @method getDropdownCity
     */
    getDropdownCity(zipcode: string): Observable<any> {
        // if zipcode is already know, you return cities set
        if (this._cities && this._zipcode === zipcode) {
            return Observable.of(this._cities);
        }

        // else ressource is called at url: {@link _url}
        else {
            this._zipcode = zipcode;
            return this.httpService.get(this._url + '?codePostal=' + zipcode).map((res) => {
                this._cities = Array();
                
                let result = JSON.parse(res.body.toString());
                let newCities = Array();
                result.forEach(city => {
                    newCities.push(city.localite);
                });
                newCities = newCities.filter( this.onlyUnique );
                newCities.forEach(city => {
                    // convert in DropdownValueModel
                    this._cities.push(new DropdownValueModel(city, city));
                });

                // return an array of DropdownValueModel with unique value
                return this._cities;
            });
        }
    }
}