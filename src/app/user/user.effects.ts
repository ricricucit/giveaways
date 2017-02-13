/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserActions } from './user.actions';
import { AppState } from '../reducers';
import { UserService } from './user.service';

@Injectable()

export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService,
    private userActions: UserActions
  ) { }

  @Effect() logout$ = this.actions$
    // Listen for the 'LOGOUT' action
    .ofType(UserActions.LOGOUT)
    // Map the payload to use as the request body
    .map(action => action.payload)
    .switchMap(() => this.userService.logout()
      // If successful, dispatch success action with result
      .mergeMap((res: any) => Observable.of(
        this.userActions.logoutSuccess(res)
        )
      )
      .catch((err) => Observable.of(
        // If request fails, dispatch failed action with result (error)
        this.userActions.logoutFail(err)
      ))
    );

  @Effect() register$ = this.actions$
    .ofType(UserActions.REGISTER_USER)
    .map(action => action.payload)
    .switchMap(user => this.userService.register(user)
      // If successful, dispatch success action with result
      .mergeMap((res: any) => Observable.of(
        this.userActions.registerUserSuccess(res)
        )
      )
      .catch((err) => Observable.of(
        // If request fails, dispatch failed action with result (error)
        this.userActions.registerUserFail(err)
      ))
    );

}
