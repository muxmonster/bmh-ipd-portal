import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ipd-portal',
    loadComponent: () => import('./components/home/home').then((m) => m.Home),
  },
  {
    path: 'report/ipd',
    loadChildren: () => import('./report/report-routing-module').then((m) => m.ReportRoutingModule),
  },
];
