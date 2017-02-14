/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { UserActions } from './user.actions';
import { User } from './user.model';

export interface UserState {
  user: User;
  loading: boolean;
  loaded: boolean;
};


  // readonly id?: number;
  // readonly name: string;
  // readonly surname: string;
  // readonly image: string;         //avatar
  // readonly options?: Object;       //user options (lang, timezone, etc.)
  // readonly ts: number;            //timestamp

export const initialState: UserState = {
  
  user: { name: '666', 
          surname: '666', 
          email: '666@666.com',
          image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=USER&w=150&h=150',
          options: '{}',
          password: '666666',
          ts: 0
        },
  loading: false,
  loaded: true,
};

export function userReducer(state = initialState, action: Action): UserState {
  switch (action.type) {

    case UserActions.EDIT_USER: {
      return Object.assign({}, state, {
        user: action.payload
      });
    }

    default: {
      return state;
    }
  }
}

