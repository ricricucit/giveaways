import { UserActions } from './user/user.actions';
import { UserService } from './user/user.service';
import { BackandService } from '@backand/angular2-sdk';

export const APP_PROVIDERS = [
  UserActions,
  UserService,
  BackandService
];
