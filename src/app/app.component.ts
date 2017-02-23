import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MOBILE } from './services/constants';

import { BackandService } from '@backand/angular2-sdk';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  showMonitor = (ENV === 'development' && !AOT &&
    ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
  );
  mobile = MOBILE;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private backand: BackandService
  ) { }

  activateEvent(event) {
    if (ENV === 'development') {
      console.log('Activate Event:', event);
    }
  }

  deactivateEvent(event) {
    if (ENV === 'development') {
      console.log('Deactivate Event', event);
    }
  }

  ngOnInit(): void {
    this.backand.init({
      appName: 'giveaway',
      anonymousToken: '6a4c7dfd-6482-4867-827f-57c3804e80a9',
      signUpToken: '6a4c7dfd-6482-4867-827f-57c3804e80a9'
    });
    /*this.backand.object.getList('users')
    .then((response) => {
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    });*/
  }
}
