import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../layouts/main/main.component';
import { UserlayoutComponent } from '../layouts/userlayout/userlayout.component';
import { LkComponent } from '../lk/lk.component';
import { LoginComponent } from '../login/login.component';
import { QuestionComponent } from '../question/question.component';
import { RegisterComponent } from '../register/register.component';
import { AuthGuard } from '../services/auth.guard';
import { BlogComponent } from '../services/blog/blog.component';
import { CourtcasesComponent } from '../services/courtcases/courtcases.component';
import { RequisiteComponent } from '../services/requisite/requisite.component';
import { ShowpageComponent } from '../services/showpage/showpage.component';
import { ShowpriceComponent } from '../services/showprice/showprice.component';
import { UslugiFLComponent } from '../uslugi-fl/uslugi-fl.component';
import { UslugiULComponent } from '../uslugi-ul/uslugi-ul.component';
import { HomeComponent } from './home.component';

const routes: Routes = [{
  path: '', component: UserlayoutComponent, children: [
    { path: 'main', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'lk', component: LkComponent, canActivate: [AuthGuard] },
    { path: 'uslugiFL', component: UslugiFLComponent },
    { path: 'uslugiUL', component: UslugiULComponent },
    { path: 'showpage', component: ShowpageComponent },
    { path: 'requisite', component: RequisiteComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'courtcases', component: CourtcasesComponent },
    { path: 'showprice', component: ShowpriceComponent },
    { path: 'question', component: QuestionComponent },
    { path: '', component: HomeComponent }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
