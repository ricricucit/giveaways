import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { MdSnackBar } from '@angular/material';

import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { UserActions } from '../../user/user.actions';
import { User } from '../../user/user.model';

@Component({
  selector: 'signup',
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
  user: User;
  user$: Observable<User>;
  constructor(
    fb: FormBuilder,
    private store: Store<AppState>,
    private userActions: UserActions,
    public snackBar: MdSnackBar
  ) {

    this.registerForm = fb.group({
      name: ['',  Validators.required],
      surname:  ['', Validators.required],
      email: ['', Validators.required],
      password:  ['', Validators.required],
      image: ''
    });
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password:  ['', Validators.required]
    });
    this.user$ = this.store.select(state => state.user.user);
    this.user$.takeUntil(this.destroyed$)
      .subscribe(user => { this.user = user; });
  }

  ngOnInit() {
    this.registerForm.get('name').setValue(this.user.name);
    this.registerForm.get('surname').setValue(this.user.surname);
    this.registerForm.get('email').setValue(this.user.email);
    this.registerForm.get('password').setValue(this.user.password);
    this.registerForm.get('image').setValue(this.user.image);

    this.loginForm.get('email').setValue(this.user.email);
    this.loginForm.get('password').setValue(this.user.password);
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
    if(!this.registerForm.valid){
      //show snackBar to alert user about errors
      let config = {duration: 3500};
      this.snackBar.open('Some info is missing...', 'OK', config);
      return;
    }

    switch(action){
      case 'login':
        alert('login!');
        
        this.store.dispatch(this.userActions.login({
              email: this.loginForm.get('email').value,
              password: this.loginForm.get('password').value
            }));
      break;

      case 'register':
        alert('register!');
        //no ID means that the user is new, so we create it
        if(!this.user.id || this.user.id === 0){
          alert('CREATE user!');
          this.store.dispatch(this.userActions.registerUser(
            Object.assign({}, this.user, { 
                                            name: this.registerForm.get('name').value,
                                            surname: this.registerForm.get('surname').value,
                                            email: this.registerForm.get('email').value,
                                            password: this.registerForm.get('password').value,
                                            image: this.registerForm.get('image').value
                                          }
          )));
        //user w/ ID means the user exists, so we modify it
        }else{
          alert('EDIT user!');
          this.store.dispatch(this.userActions.editUser(
              Object.assign({}, this.user,  { 
                                              name: this.registerForm.get('name').value,
                                              surname: this.registerForm.get('surname').value,
                                              email: this.registerForm.get('email').value,
                                              password: this.registerForm.get('password').value,
                                              image: this.registerForm.get('image').value
                                            }
          )));
        }

      break;
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
