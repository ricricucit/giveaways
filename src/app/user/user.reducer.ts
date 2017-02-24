/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { UserActions } from './user.actions';
import { User } from './user.model';

export interface UserState {
  user: User;
  isLoading: boolean;
};

export const initialState: UserState = {

  user: {
          access_token : '',
          appName : '',
          expires_in : '',
          userId : 0,
          firstName: 'Name',
          lastName: 'LastName',
          fullName: 'Name LastName',
          regId: '',
          username: 'your@email.com', // email
          image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=USER&w=150&h=150',
          options: '{}',
          password: '',
          ts: 0
        },
  isLoading: false
};

export function userReducer(state = initialState, action: Action): UserState {
  switch (action.type) {

    case UserActions.EDIT_USER: {
      return Object.assign({}, state, {
        user: action.payload
      });
    }

    case UserActions.LOGIN: {
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, action.payload.data)
      }, {isLoading: true});
    }

    case UserActions.LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, action.payload.data)
      }, {isLoading: false});
    }

    case UserActions.LOGIN_FAIL: {
      return Object.assign({}, state, {isLoading: false});
    }

    default: {
      return state;
    }
  }
}

