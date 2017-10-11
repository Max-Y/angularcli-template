/**
 * @license
 * Copyright Angularcli-template All Rights Reserved.
 * 
 */

import { AuthService } from './auth.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, ResponseContentType, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import { environment } from "../../environments/environment";

import { Router } from '@angular/router';


/**
 * @class ResponseWS
 * Model of response in custom HTTP
 */
export class ResponseWS {
    public body?: string | Object | FormData | ArrayBuffer | Blob;
    public status?: number;

    constructor(body?: string | Object | FormData | ArrayBuffer | Blob, status?: number) {
      this.body = body;
      this.status = status;
    }
}



/**
 * @service HttpService
 *
 * @stable
 */
interface IHttpService {
    /**
     * @interface IHttpService
     * 
     * @description
     * Surchage of HTTP
     */


    /**
     * @method request
     * Surcharge request by a default options (header resquest)
     * Launch a custom error when an error is catch
     */
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>


    /**
     * @method get
     * Surcharge of GET protocol
     */
    get(url: string, _options?: RequestOptionsArgs): Observable<ResponseWS>


    /**
     * @method getPDF
     * Custome request to get a PDF file
     */
    getPDF(url: string, _options?: RequestOptionsArgs): Observable<Response>


    /**
     * @method post
     * Surcharge of POST protocol
     */
    post(url: string, body: any, _options?: RequestOptionsArgs): Observable<ResponseWS>


    /**
     * @method put
     * Surcharge of PUT protocol
     */
    put(url: string, body: any, _options?: RequestOptionsArgs): Observable<ResponseWS>
}
@Injectable()
export class HttpService extends Http implements IHttpService {

  constructor(backend: XHRBackend, defaultOptions: RequestOptions, private authService: AuthService, private router:Router) {
    super(backend, defaultOptions);
  }


  /**
   * @method request
   */
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options).catch(this.catchRequestError);
  }


  /**
   * @method get
   */
  get(url: string, _options?: RequestOptionsArgs): Observable<ResponseWS> {
    //this.router.navigate(['/echec-authenticated']);
    url = this.updateUrl(url);
    let options = this.getRequestOptionArgs(_options);
    return super.get(url, options)
      .timeout(environment.timeout)
      .map((res: Response) => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            return new ResponseWS(res['_body'], res.status);
          }
        }
      }).catch(this.authService.catchResponseError);
  }


  /**
   * @method getPDF
   */
  getPDF(url: string, _options?: RequestOptionsArgs): Observable<Response> {
    let headers = new Headers({ 
            'Content-Type': 'application/json', 
            'Accept': 'application/pdf'
        });

    let options = new RequestOptions({ headers: headers });
    options.responseType = ResponseContentType.Blob;
    options.withCredentials = true;

    url = this.updateUrl(url);
    return super.get(url, options)
      .timeout(environment.timeout)
      .map((res: Response) => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            return new Blob([res.blob()], { type: 'application/pdf' });
          }
        }
      }).catch(this.authService.catchResponseError);
  }


  /**
   * @method post
   */
  post(url: string, body: any, _options?: RequestOptionsArgs): Observable<ResponseWS> {
    url = this.updateUrl(url);
    let options = this.getRequestOptionArgs(_options);
    return super.post(url, body, options)
      .timeout(environment.timeout)
      .map((res: Response) => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            return new ResponseWS(res['_body'], res.status);
          }
        }
      })
      .catch(this.authService.catchResponseError);
  }


  /**
   * @method put
   */
  put(url: string, body: any, _options?: RequestOptionsArgs): Observable<ResponseWS> {
    url = this.updateUrl(url);
    let options = this.getRequestOptionArgs(_options);
    return super.put(url, body, options)
      .timeout(environment.timeout)
      .map((res: Response) => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            return new ResponseWS(res['_body'], res.status);
          }
        }
      })
      .catch(this.authService.catchResponseError);
  }


  /**
   * @method catchRequestError
   * Call when an error is catch by the server
   * @param self 
   */
  private catchRequestError(error: Response): Observable<Response> {
    return Observable.throw('Server error');
  }


  /**
   * @method updateUrl
   * Return URL based on the current environment
   * @param req 
   */
  private updateUrl(req: string): string {
    return  (environment.baseUri || window.location.origin) + environment.baseUrl + req;
  }


  /**
   * @method getRequestOptionArgs
   * Return URL with some option setted
   */
  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.withCredentials = true;
    return options;
  }


  /**
   * @method catchResponseError
   * Call when an error is catch on the response
   */
  private catchResponseError(error: any) {
    console.debug("HTTP ERROR", error);
    if (error.status < 400 || error.status === 500) {
      return Observable.throw(new Error(error.status));
    }
  }

}