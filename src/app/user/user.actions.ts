/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { User } from './user.model';

@Injectable()

export class UserActions {

  /* --------------------------------------- REGISTER */
  static REGISTER_USER = '[User] Register User';
  registerUser(user: User): Action {
    return {
      type: UserActions.REGISTER_USER,
      payload: user
    };
  }

  static REGISTER_FAIL = '[User] Register Fail';
  registerUserFail(err: Error): Action {
    return {
      type: UserActions.REGISTER_FAIL,
      payload: err
    };
  }

  static REGISTER_SUCCESS = '[User] Register Success';
  registerUserSuccess(res: Response): Action {
    return {
      type: UserActions.REGISTER_SUCCESS,
      payload: res
    };
  }
  /* --------------------------------------- end REGISTER */


  /* --------------------------------------- GET */
  static GET_USER = '[User] Get User';
  getUser(user: User): Action {
    return {
      type: UserActions.GET_USER,
      payload: user
    };
  }

  static GET_USER_FAIL = '[User] Get User Fail';
  getUserFail(err: Error): Action {
    return {
      type: UserActions.GET_USER_FAIL,
      payload: err
    };
  }

  static GET_USER_SUCCESS = '[User] Get User Success';
  getUserSuccess(res: Response): Action {
    return {
      type: UserActions.GET_USER_SUCCESS,
      payload: res
    };
  }
  /* --------------------------------------- end GET */

  /* --------------------------------------- EDIT */
  static EDIT_USER = '[User] Edit User';
  editUser(user: User): Action {
    return {
      type: UserActions.EDIT_USER,
      payload: user
    };
  }

  static EDIT_USER_SUCCESS = '[User] Edit User Success';
  editUserSuccess(user: User): Action {
    return {
      type: UserActions.EDIT_USER_SUCCESS,
      payload: user
    };
  }

  static EDIT_USER_FAIL = '[User] Edit User Fail';
  editUserFail(user: User): Action {
    return {
      type: UserActions.EDIT_USER_FAIL,
      payload: user
    };
  }

  /* --------------------------------------- end EDIT */

  /* --------------------------------------- LOG IN */
  static LOGIN = '[User] Login';
  login(data: any): Action {
    return {
      type: UserActions.LOGIN,
      payload: data
    };
  }

  static LOGIN_FAIL = '[User] Login Fail';
  loginFail(err: Error): Action {
    return {
      type: UserActions.LOGIN_FAIL,
      payload: err
    };
  }

  static LOGIN_SUCCESS = '[User] Login Success';
  loginSuccess(res: Response): Action {
    return {
      type: UserActions.LOGIN_SUCCESS,
      payload: res
    };
  }
  /* --------------------------------------- end LOG IN */

  /* --------------------------------------- LOG OUT */
  static LOGOUT = '[User] Logout';
  logout(): Action {
    return {
      type: UserActions.LOGOUT
    };
  }

  static LOGOUT_FAIL = '[User] Logout Fail';
  logoutFail(err: Error): Action {
    return {
      type: UserActions.LOGOUT_FAIL,
      payload: err
    };
  }

  static LOGOUT_SUCCESS = '[User] Logout Success';
  logoutSuccess(res: Response): Action {
    return {
      type: UserActions.LOGOUT_SUCCESS,
      payload: res
    };
  }
  /* --------------------------------------- end LOG OUT */
}
