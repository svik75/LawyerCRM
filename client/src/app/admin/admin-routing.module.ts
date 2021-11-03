import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { AdminComponent } from './admin.component';
import { ClaimsFLComponent } from './claims-fl/claims-fl.component';
import { ClaimsULComponent } from './claims-ul/claims-ul.component';
import { ContractsComponent } from './contracts/contracts.component';
import { QueryComponent } from './query/query.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';

const routes: Routes =
[{
  path: 'admin', component: AdminComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      {path: 'query', component: QueryComponent, canActivateChild: [AuthGuard]},
      {path: 'claimsUL', component: ClaimsULComponent, canActivateChild: [AuthGuard]},
      {path: 'claimsFL', component: ClaimsFLComponent, canActivateChild: [AuthGuard]},
      {path: 'contracts', component: ContractsComponent, canActivateChild: [AuthGuard]},
      {path: 'users', component: UsersComponent, canActivateChild: [AuthGuard]},
      {path: 'reports', component: ReportsComponent, canActivateChild: [AuthGuard]}]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
