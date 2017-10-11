/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { URLSearchParams } from "@angular/http"
import { Observable, Subscription } from 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { environment } from "../../environments/environment";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';


/**
 * @service AuthService
 *
 * @stable
 * Based on https://httpbin.org/
 */
interface IAuthService {
    /**
     * @interface IAuthService
     * 
     * 
     */


    /**
     * @method isLogIn
     * Return boolean to know if the user is loggin
     */
    isLogIn()


    /**
     * @method initLogin
     * Manage the authentification 
     */
    initLogin(): Observable<Response>


    /**
     * @method refreshLogin
     * Force and remake an authenticate
     */
    refreshLogin(): void


    /**
     * @method catchResponseError
     * Call when an error is catch on authenticate
     */
    catchResponseError(error: any)
}
@Injectable()
export class AuthService implements IAuthService {
     // Observable string sources
    private _loggedIn = new Subject<Boolean>();

    // Observable string streams
    loggedIn$ = this._loggedIn.asObservable();


    private loginEndPoint: string;
    private ticket: string | false;
    private callbackURL: string;

    // Used to know if user is log In
    public isLoggedIn: boolean = false;

    // Used to redirecta after log In
    public redirectUrl: String;

    constructor(private http: Http, private route: ActivatedRoute, private location: Location, private router:Router) {
        this.ticket = '';
        this.callbackURL = '';
        this.loginEndPoint = '';
        this._loggedIn.next(false);
    }


    /**
     * @method isLogIn
     */
    isLogIn() {
        this._loggedIn.next(true);
    }
    

    /**
     * @method initLogin
     */
    initLogin(): Observable<Response> {
        this.ticket = this.getTicketRouteParam();
            // When there is a param in the URL
            if (window.location.href.indexOf('?') === -1) {
                this.callbackURL = window.location.href;
                this.callbackURL = this.callbackURL.indexOf('#') === -1 ?  this.callbackURL + '#/' : this.callbackURL;
            }
            // When there is no param in the URL
            else {
                let urlStart = window.location.href.split('?')[0];
                let urlEnd  = window.location.href.split('#')[1];
                this.callbackURL = urlStart + '#'+ (urlEnd || '');
            }
        return this.processTicket();
    }


    /**
     * @method refreshLogin
     */
    refreshLogin(): void {
        this.ticket = null;
        this.callbackURL = window.location.href.split('?')[0];
        this.processTicket();
    }


    /**
     * @method catchResponseError
     */
    catchResponseError(error: any) {
        if (error.status < 400 || error.status === 500) {
            console.debug("HTTP ERROR", error);
            return Observable.throw(new Error(error.status));
        }
        if (error.status === 401) {
            window.location.href = environment.endpoints.casURL + window.location.href.split('?')[0];
        }
    }


    /**
     * @method processTicket
     * Manage authenticate if there is or no a ticket in the URL
     */
    private processTicket(): Observable<Response> {
        // if there is a ticket in URL
        if (this.ticket) {
            // We try to autenticate
            return this.loginBackend()
        } else {
            // We redirect on CAS Login
            return this.redirectToCas();
        }
    }


    /**
     * @method getTicketRouteParam
     * Get the ticket in the URL
     */
    private getTicketRouteParam(): string | false {
        let request = new RegExp(/(\?|&)ticket\=([^&]*)/);
        let uriquery = window.location.search.match(request);
        if (uriquery && uriquery.length > 2) {
            return decodeURIComponent(uriquery[2]);
        };
        return false;
    }
    

    /**
     * @method redirectToCas
     * Redirect on CAS Login
     */
    private redirectToCas(): Observable<Response> {
        window.location.href = environment.endpoints.casURL + encodeURIComponent(this.callbackURL);
        return Observable.of(new Response(true));
    }
    

    /**
     * @method loginBackend
     * Call authenticate service
     */
    private loginBackend(): Observable<Response> {
        let data = new URLSearchParams();
        data.append('ticket', this.ticket.toString());
        data.append('serviceURL', this.callbackURL);
        let options = new RequestOptions({withCredentials: true });
        this.loginEndPoint = (environment.baseUri || window.location.origin) + environment.endpoints.login;
        return this.http.post(this.loginEndPoint, data, options)
            .map((data: any) => { this.isLoggedIn = true; this.isLogIn(); }).catch(this.catchResponseError);
    }
}