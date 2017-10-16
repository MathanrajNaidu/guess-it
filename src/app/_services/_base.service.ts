import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { } from '../_models';
import { Observable, Subject } from 'rxjs';

export class BaseService {

  // prevents multi call in one-time
  loaderObj: { [key: string]: boolean } = {};
  loadingObj: { [key: string]: Subject<any> } = {};
  loadedObj: { [key: string]: any } = {};

  constructor(protected http: Http) { }

  public get(isAuth = false, url: string, preventMultiCall = false, customHeaders: Headers = null) {
    let header;
    if (customHeaders) {
      header = new RequestOptions({ headers: customHeaders });
    }
    else {
      header = this.getHeaderOptions(isAuth);
    }
    let remote = this.http.get(url, header)
      .catch(this.handleError)
      .map(this.extractData);

    return this.getOrStoreLoadedObject(preventMultiCall, url, remote);
  }

  public post(isAuth = false, url: string, body: {}, preventMultiCall = false) {
    let json = JSON.stringify(body);
    let header = this.getHeaderOptions(isAuth);
    let remote = this.http.post(url, json, header)
      .catch(this.handleError)
      .map(this.extractData);

    return this.getOrStoreLoadedObject(preventMultiCall, url, remote);
  }

  public put(isAuth = false, url: string, body: {}, preventMultiCall = false) {
    let json = JSON.stringify(body);
    let header = this.getHeaderOptions(isAuth);
    let remote = this.http.put(url, json, header)
      .catch(this.handleError)
      .map(this.extractData);

    return this.getOrStoreLoadedObject(preventMultiCall, url, remote);
  }

  public delete(isAuth = false, url: string, preventMultiCall = false) {
    let header = this.getHeaderOptions(isAuth);
    let remote = this.http.delete(url, header)
      .catch(this.handleError)
      .map(this.extractData);

    return this.getOrStoreLoadedObject(preventMultiCall, url, remote);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any): Observable<any> {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
    const body = error.json() || '';
    // const err = body.error_description || JSON.stringify(body);
    const err = body.error_description || body || 'Connection Timeout';
    
    // let errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    // } else {
    //   errMsg = error.message ? error.message : error.toString();
    // }
    // console.error(errMsg);
    // return Observable.throw(errMsg);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      console.log(errMsg);
      return Observable.throw(err);
    } else {
      errMsg = error.message ? error.message : error.toString();
      console.log(errMsg);
      return Observable.throw(errMsg);
    }
  }

  private getHeaderOptions(isAuth, isFormData:boolean=false): RequestOptions {
    let headersValue = {
        'Authorization': ''
    };
   
    if (!isFormData) {
      headersValue['Content-Type'] = 'application/json';
    }


    let headers = new Headers(headersValue)

    let options = new RequestOptions({ headers: headers });

    return options;
  }

  private getOrStoreLoadedObject(preventMultiCall: boolean, url: string, remote: Observable<any>) {
    if (!preventMultiCall) {
      return remote;
    }

    if (this.loadedObj[url]) {
      return new Observable<any>((sub) => sub.next(this.loadedObj[url]));
    }

    if (this.loaderObj[url]) {
      return this.loadingObj[url];
    }

    this.loaderObj[url] = true;
    this.loadingObj[url] = new Subject<any>();
    return remote.map(res => {
      this.loadingObj[url].next(res);
      this.loadedObj[url] = res;
      return res;
    });
  }
}
