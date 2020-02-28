import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MaterialService, MaterialInstance } from 'src/app/services/material.service';
import { Router } from '@angular/router';
import { SetTagPage } from 'src/app/services/page.service';
import { QueryService } from 'src/app/services/query.service';
import { AuthService } from 'src/app/services/auth.service';
import { Query, HistoryOrders } from 'src/app/services/interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('parallax1', null) plxRef1: ElementRef;
  @ViewChild('parallax2', null) plxRef2: ElementRef;
  @ViewChild('parallax3', null) plxRef3: ElementRef;
  @ViewChild('parallax4', null) plxRef4: ElementRef;

  plx1: MaterialInstance;
  plx2: MaterialInstance;
  plx3: MaterialInstance;
  plx4: MaterialInstance;


  myQuery: Query;

  queryPath: string[] = [];

  historyOrder: HistoryOrders;


  constructor(private router: Router, private tagPage: SetTagPage, private query: QueryService, private auth: AuthService) {
    this.tagPage.setTitle('ВашЮрист.Москва - Юридические услуги');
  }

  ngOnInit() {


  }

  ngAfterViewInit() {
    this.plx1 = MaterialService.initializeParallax(this.plxRef1);
    this.plx2 = MaterialService.initializeParallax(this.plxRef2);
    this.plx3 = MaterialService.initializeParallax(this.plxRef3);
    this.plx4 = MaterialService.initializeParallax(this.plxRef4);


  }

  ngOnDestroy() {
    this.plx1.destroy();
    this.plx2.destroy();
    this.plx3.destroy();
    this.plx4.destroy();


  }

  ngonSubmit() {

  }

  onSubmit() {


  }


  onSubmitFL() {
    this.router.navigate(['/uslugiFL']);
  }

  onSubmitQuestion() {
    this.queryPath.push('Вопрос с главной страницы');
    this.query.setQueryPath(this.queryPath);
    this.router.navigate(['/question']);
  }

  onSubmitUL() {
    this.router.navigate(['/uslugiUL']);
  }

  onCancel() {

  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }


}
