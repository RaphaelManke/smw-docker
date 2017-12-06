import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Extension} from './extension';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class HttpService {

  url = '//github.com/wikimedia/mediawiki-extensions/blob/master/.gitmodules';

  constructor (private http: HttpClient) {}

  getExtensions(): Observable<Extension[]> {
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let data = res.json();
    console.log(data);
    return data;
  }

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
