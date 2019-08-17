import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BaseService {

  // tslint:disable-next-line: no-inferrable-types
  url: string = `${environment.baseUrl}/api`;

  constructor(private http: HttpClient) { }

  get(endpoint: string, params?: any, reqOpts?: any, headers?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }
    if (headers) {
      reqOpts.headers = this.setHeaders(headers);
    }
    if (params) {
      reqOpts.params = this.setParams(params);
    }

    return this.http.get(`${this.url}/${endpoint}`, reqOpts);
  }

  post(endpoint: string, body: any, headers?: any , params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {};
    }
    if (headers) {
      reqOpts.headers = this.setHeaders(headers);
    }
    if (params) {
      reqOpts.params = this.setParams(params);
    }
    return this.http.post(`${this.url}/${endpoint}`, body, reqOpts);
  }

  put(endpoint: string, body: any, headers?: any , params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {};
    }
    if (headers) {
      reqOpts.headers = this.setHeaders(headers);
    }
    if (params) {
      reqOpts.params = this.setParams(params);
    }
    return this.http.put(`${this.url}/${endpoint}`, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any, headers?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }
    if (headers) {
      reqOpts.headers = this.setHeaders(headers);
    }
    return this.http.delete(`${this.url}/${endpoint}`, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(`${this.url}/${endpoint}`, body, reqOpts);
  }

  timezone(lat, lng) {
    //TODO: Cambiar Key para  google apis
    // tslint:disable-next-line: max-line-length
    return this.http.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + lng + '&timestamp=' + new Date().getTime() / 1000 + '&key=AIzaSyB3PlzlhobsZ8tXcr5gBx14uq348T-uKjM');
  }

  private setHeaders(headers: any): HttpHeaders {
    let headersReturn = new HttpHeaders();
    // tslint:disable-next-line: forin
    for (let k in headers) {
      headersReturn = headersReturn.set(k, String(headers[k]));
    }
    return headersReturn;
  }

  private setParams(params: any): HttpParams {
    let paramsReturn = new HttpParams();
    // tslint:disable-next-line: forin
    for (let k in params) {
      paramsReturn = paramsReturn.set(k, params[k]);
    }
    return paramsReturn;
  }
}
