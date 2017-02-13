import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { API_BASE_URL } from '../services/constants';
import { RequestBase } from '../services/request-base';

import { BackandService } from '@backand/angular2-sdk'

import { User } from '../user/user.model';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';

import * as moment from 'moment'

@Injectable()
export class UserService extends RequestBase {
  constructor(public http: Http, private store: Store<AppState>, private backand: BackandService) {
    super(http);
  }

  logout(): Observable<string> {
    return this.http.get(`${API_BASE_URL}/logout`, this.optionsNoPre)
      .map(res => res.text());
  }

  register(user): Observable<string> {
    //here API call to register users
    let today: string = moment().format(); //Format used by Backand.com = 2017-02-13T18:57:30+01:00
    return Observable.fromPromise(this.backand.signup(user.name, user.surname, user.email, user.password, user.password, {image: user.image, options: user.options, ts: today}));
  }

}
