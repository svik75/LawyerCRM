import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserlayoutComponent } from './layouts/userlayout/userlayout.component';
import { LkComponent } from './lk/lk.component';
import { HttpClientModule } from '@angular/common/http';
import { UslugiFLComponent } from './uslugi-fl/uslugi-fl.component';
import { UslugiULComponent } from './uslugi-ul/uslugi-ul.component';
import { QueryComponent } from './admin/query/query.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { MainComponent } from './layouts/main/main.component';
import { ClaimsULComponent } from './admin/claims-ul/claims-ul.component';
import { ClaimsFLComponent } from './admin/claims-fl/claims-fl.component';
import { ContractsComponent } from './admin/contracts/contracts.component';
import { UsersComponent } from './admin/users/users.component';
import { LoaderComponent } from './services/loader/loader.component';
import { QuestionComponent } from './question/question.component';
import { QueryFilterComponent } from './admin/query/query-filter/query-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowpageComponent } from './services/showpage/showpage.component';
import { ShowpriceComponent } from './services/showprice/showprice.component';
import { CourtcasesComponent } from './services/courtcases/courtcases.component';
import { RequisiteComponent } from './services/requisite/requisite.component';
import { BlogComponent } from './services/blog/blog.component';
import { ChartsModule } from 'ng2-charts';
import { BarchartComponent } from './services/barchart/barchart.component';
import { PiechartComponent } from './services/piechart/piechart.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { HoverDirective } from './directives/hover.directive';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserlayoutComponent,
    LkComponent,
    UslugiFLComponent,
    UslugiULComponent,
    QueryComponent,
    AdminComponent,
    MainComponent,
    ClaimsULComponent,
    ClaimsFLComponent,
    ContractsComponent,
    UsersComponent,
    LoaderComponent,
    QuestionComponent,
    QueryFilterComponent,
    ShowpageComponent,
    ShowpriceComponent,
    CourtcasesComponent,
    RequisiteComponent,
    BlogComponent,
    BarchartComponent,
    PiechartComponent,
    ReportsComponent,
    HoverDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
