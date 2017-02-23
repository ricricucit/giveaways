import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { API_BASE_URL } from '../services/constants';
import { RequestBase } from '../services/request-base';

import { BackandService } from '@backand/angular2-sdk';

import { User } from '../user/user.model';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';

import * as moment from 'moment';

@Injectable()
export class UserService extends RequestBase {
  constructor(public http: Http, private store: Store<AppState>, private backand: BackandService) {
    super(http);
  }

  // logout the user
  logout(): Observable<string> {
    return Observable.fromPromise(this.backand.signout());
  }

  // login the user
  login(action: any): Observable<string> {
    // here API call to login user
    alert(action.email + ',' + action.password);
    return Observable.fromPromise(this.backand.signin(action.email, action.password));
  }

  // register and login the user
  register(user: any): Observable<string> {
    // here API call to register user
    let today: string = moment().format(); // Format used by Backand.com = 2017-02-13T18:57:30+01:00
    return Observable.fromPromise(this.backand.signup(user.name,
                                                      user.surname,
                                                      user.email,
                                                      user.password,
                                                      user.password,
                                                      { image: user.image,
                                                        options: user.options,
                                                        ts: today
                                                      }
                                                      )
                                  );
  }

  // register and login the user
  edit(user: any): Observable<string> {
    // here API call to register user
    let today: string = moment().format(); // Format used by Backand.com = 2017-02-13T18:57:30+01:00
    return Observable.fromPromise(
      this.backand.object.update('users',
                                  user.userId,
                                  user,
                                  {returnObject : true} // params | object
                                )                       // Allowed: returnObject, deep
        );
  }

  // get the logged in user
  get(force = false): Observable<string> {
    // force = Forces the SDK to refresh its data from the server. Default: FALSE
    return Observable.fromPromise(this.backand.user.getUserDetails(force));
  }

}
