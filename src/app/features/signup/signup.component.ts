import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { MdSnackBar } from '@angular/material';

import { AppState } from '../../reducers';
import { UserState } from '../../user/user.reducer';
import { Store } from '@ngrx/store';
import { UserActions } from '../../user/user.actions';
import { User } from '../../user/user.model';

@Component({
  selector: 'signup-component',
  templateUrl: './signup.component.html',
  styles: [`#my-logout-button { background: #F44336 }`]
})

export class SignupComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  registerForm = new FormGroup({});
  loginForm = new FormGroup({});
  nameLabel = 'Enter your name';
  surnameLabel = 'Enter your surname';
  emailLabel = 'Enter your e-mail';
  passwordLabel = 'Enter your Password';
  imageLabel = 'Upload a photo of Yourself';
  signUpLabel = 'Sign Up';
  editLabel = 'Edit Profile';
  user: User;
  isLoading: boolean;
  user$: Observable<UserState>;
  constructor(
    fb: FormBuilder,
    private store: Store<AppState>,
    private userActions: UserActions,
    public snackBar: MdSnackBar
  ) {

    this.registerForm = fb.group({
      firstName: ['',  Validators.required],
      lastName:  ['', Validators.required],
      username: ['', Validators.required],
      password:  ['', Validators.required],
      image: ''
    });
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password:  ['', Validators.required]
    });
    this.user$ = this.store.select(state => state.user);
    this.user$.takeUntil(this.destroyed$)
      .subscribe(user => { this.user = user.user; this.isLoading = user.isLoading; });
  }

  ngOnInit() {

  }

/*  clearName() {
    this.store.dispatch(this.userActions.editUser(
      Object.assign({}, this.user, { name: '' }
      )));

    this.registerForm.get('name').setValue('');
  }*/

  logout() {
    this.store.dispatch(this.userActions.logout());
  }

  signIn(action) {

    switch (action) {
      case 'login':
        if (!this.loginForm.valid) {
          // show snackBar to alert user about errors
          let config = {duration: 3500};
          this.snackBar.open('Some info is missing...', 'OK', config);
          return;
        }else {
          alert('login!');
          this.store.dispatch(this.userActions.login({
              email: this.loginForm.get('username').value,
              password: this.loginForm.get('password').value
          }));
        }
      break;

      case 'register':
        if (!this.registerForm.valid) {
          // show snackBar to alert user about errors
          let config = {duration: 3500};
          this.snackBar.open('Some info is missing...', 'OK', config);
          return;
        }else {
          alert('Register OR Edit!');
          // no ID means that the user is new, so we create it
          if (!this.user.userId || this.user.userId === 0) {
            alert('CREATE user!');
            this.store.dispatch(this.userActions.registerUser(
              Object.assign({}, this.user, {
                                              firstName: this.registerForm.get('firstName').value,
                                              lastName: this.registerForm.get('lastName').value,
                                              username: this.registerForm.get('username').value,
                                              password: this.registerForm.get('password').value,
                                              image: this.registerForm.get('image').value
                                            }
            )));
          // user w/ ID means the user exists, so we modify it
          }else {
            alert('EDIT user!');
            this.store.dispatch(this.userActions.editUser(
                Object.assign({}, this.user,  {
                                                firstName: this.registerForm.get('firstName').value,
                                                lastName: this.registerForm.get('lastName').value,
                                                username: this.registerForm.get('username').value,
                                                password: this.registerForm.get('password').value,
                                                image: this.registerForm.get('image').value
                                              }
            )));
          }
        }
      break;
      default:
      break;
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
