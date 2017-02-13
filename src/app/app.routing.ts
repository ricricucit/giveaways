/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NotFound404Component } from './not-found404.component';
import { AboutComponent } from './features/about/about.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'lazy', loadChildren: './features/lazy/index#LazyModule' },
  { path: 'sync', loadChildren: './features/sync/index#SyncModule?sync=true' },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFound404Component }
];
