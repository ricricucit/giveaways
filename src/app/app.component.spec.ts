/* tslint:disable: max-line-length */
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { rootReducer } from './reducers';

import { UserActions } from './user/user.actions';
import { UserService } from './user/user.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AboutComponent } from './features/about/about.component';
import { SignupComponent } from './features/signup/signup.component';
import { BackandService } from '@backand/angular2-sdk';
import { NotFound404Component } from './not-found404.component';
import { routes } from './app.routing';
import { StoreDevToolsModule } from './features/store-devtools.module';

import 'rxjs/add/operator/takeUntil';

describe('App Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule.forRoot(),
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes),
        StoreDevToolsModule,
        StoreModule.provideStore(rootReducer)
        ],
      providers: [BackandService,  UserActions, UserService],
      declarations: [AppComponent, AboutComponent, SignupComponent, DashboardComponent, NotFound404Component]
    });
  });

  it('should contain app text', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toContainText('Angular Starter App');
  }));

});
