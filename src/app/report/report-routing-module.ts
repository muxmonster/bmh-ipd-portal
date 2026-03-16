import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpdOper } from './oper/ipd-oper/ipd-oper';

const routes: Routes = [
  {
    path: '', loadComponent: ()=>import('./ipd-report/ipd-report').then((m)=>m.IpdReport)
  },
  {
    path: 'oper',
    component: IpdOper,
    children:[
      
      {
        path: 'rpt-oper-sheet', loadComponent: () => import('./oper/rpt-oper-sheet/rpt-oper-sheet').then((m) => m.RptOperSheet)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
