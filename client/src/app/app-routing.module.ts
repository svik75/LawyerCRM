import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlayoutComponent } from './layouts/userlayout/userlayout.component';
import { AuthGuard } from './services/auth.guard';
import { AdminComponent } from './layouts/admin/admin.component';
import { QueryComponent } from './admin/query/query.component';
import { ClaimsULComponent } from './admin/claims-ul/claims-ul.component';
import { ClaimsFLComponent } from './admin/claims-fl/claims-fl.component';
import { ContractsComponent } from './admin/contracts/contracts.component';
import { UsersComponent } from './admin/users/users.component';
import { ReportsComponent } from './admin/reports/reports.component';

const routes: Routes = [
      {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      {path: 'query', component: QueryComponent, canActivateChild: [AuthGuard]},
      {path: 'claimsUL', component: ClaimsULComponent, canActivateChild: [AuthGuard]},
      {path: 'claimsFL', component: ClaimsFLComponent, canActivateChild: [AuthGuard]},
      {path: 'contracts', component: ContractsComponent, canActivateChild: [AuthGuard]},
      {path: 'users', component: UsersComponent, canActivateChild: [AuthGuard]},
      {path: 'reports', component: ReportsComponent, canActivateChild: [AuthGuard]}

    ]},
      { path: 'main', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'main'
  },
    {path: '**', component: UserlayoutComponent}

  ];


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
