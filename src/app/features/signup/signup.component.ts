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
  form: FormGroup;
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

    this.form = fb.group({
      name: ['',  Validators.required],
      surname:  ['', Validators.required],
      email: ['', Validators.required],
      password:  ['', Validators.required],
      image: ''
    });
    this.user$ = this.store.select(state => state.user.user);
    this.user$.takeUntil(this.destroyed$)
      .subscribe(user => { this.user = user; });
  }

  ngOnInit() {
    this.form.get('name').setValue(this.user.name);
    this.form.get('surname').setValue(this.user.surname);
    this.form.get('email').setValue(this.user.email);
    this.form.get('password').setValue(this.user.password);
    this.form.get('image').setValue(this.user.image);
  }

  clearName() {
    this.store.dispatch(this.userActions.editUser(
      Object.assign({}, this.user, { name: '' }
      )));

    this.form.get('name').setValue('');
  }

  logout() {
    this.store.dispatch(this.userActions.logout());
  }

  submitState() {
    if(!this.form.valid){
      //show snackBar to alert user about errors
      let config = {duration: 3500};
      this.snackBar.open('Some info is missing...', 'OK', config);
    }else{
      //no ID means that the user is new, so we create it
      if(!this.user.id || this.user.id === 0){
        alert('CREATE user!');
        this.store.dispatch(this.userActions.registerUser(
          Object.assign({}, this.user, { 
                                          name: this.form.get('name').value,
                                          surname: this.form.get('surname').value,
                                          email: this.form.get('email').value,
                                          password: this.form.get('password').value,
                                          image: this.form.get('image').value
                                        }
        )));
      //user w/ ID means the user exists, so we modify it
    }else{
        alert('EDIT user!');
        this.store.dispatch(this.userActions.editUser(
            Object.assign({}, this.user,  { 
                                            name: this.form.get('name').value,
                                            surname: this.form.get('surname').value,
                                            email: this.form.get('email').value,
                                            password: this.form.get('password').value,
                                            image: this.form.get('image').value
                                          }
        )));
      }
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
