import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Extension} from './extension';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class HttpService {

  // url = '//github.com/wikimedia/mediawiki-extensions/blob/master/.gitmodules';
  url = '//api.github.com/repos/wikimedia/mediawiki-extensions/contents/.gitmodules'

  constructor (private http: HttpClient) {}

  getExtensions(): Promise<Extension[]> {
    return this.http.get(this.url).toPromise()
      .then()
      .catch(this.handleError);
  }


  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }
}