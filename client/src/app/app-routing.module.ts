import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserlayoutComponent } from './layouts/userlayout/userlayout.component';
import { LkComponent } from './lk/lk.component';
import { AuthGuard } from './services/auth.guard';
import { UslugiFLComponent } from './uslugi-fl/uslugi-fl.component';
import { UslugiULComponent } from './uslugi-ul/uslugi-ul.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { QueryComponent } from './admin/query/query.component';
import { MainComponent } from './layouts/main/main.component';
import { ClaimsULComponent } from './admin/claims-ul/claims-ul.component';
import { ClaimsFLComponent } from './admin/claims-fl/claims-fl.component';
import { ContractsComponent } from './admin/contracts/contracts.component';
import { UsersComponent } from './admin/users/users.component';
import { QuestionComponent } from './question/question.component';
import { ShowpageComponent } from './services/showpage/showpage.component';
import { RequisiteComponent } from './services/requisite/requisite.component';
import { BlogComponent } from './services/blog/blog.component';
import { CourtcasesComponent } from './services/courtcases/courtcases.component';
import { ShowpriceComponent } from './services/showprice/showprice.component';
import { ReportsComponent } from './admin/reports/reports.component';


const routes: Routes = [
      {path: '', component: UserlayoutComponent,   children: [
      {path: 'main', component: MainComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'lk', component: LkComponent, canActivate: [AuthGuard]},
      {path: 'uslugiFL', component: UslugiFLComponent},
      {path: 'uslugiUL', component: UslugiULComponent},
      {path: 'showpage', component: ShowpageComponent},
      {path: 'requisite', component: RequisiteComponent},
      {path: 'blog', component: BlogComponent},
      {path: 'courtcases', component: CourtcasesComponent},
      {path: 'showprice', component: ShowpriceComponent},
      {path: 'question', component: QuestionComponent}]},
      {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      {path: 'query', component: QueryComponent, canActivateChild: [AuthGuard]},
      {path: 'claimsUL', component: ClaimsULComponent, canActivateChild: [AuthGuard]},
      {path: 'claimsFL', component: ClaimsFLComponent, canActivateChild: [AuthGuard]},
      {path: 'contracts', component: ContractsComponent, canActivateChild: [AuthGuard]},
      {path: 'users', component: UsersComponent, canActivateChild: [AuthGuard]},
      {path: 'reports', component: ReportsComponent, canActivateChild: [AuthGuard]}

    ]},
    {path: '**', component: UserlayoutComponent}

  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
