import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MaterialService, MaterialInstance } from 'src/app/services/material.service';
import { Router } from '@angular/router';
import { SetTagPage } from 'src/app/services/page.service';
import { QueryService } from 'src/app/services/query.service';
import { AuthService } from 'src/app/services/auth.service';
import { Query, HistoryOrders } from 'src/app/services/interfaces';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
