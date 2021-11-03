import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HistoryOrders, Query } from '../services/interfaces';
import { MaterialInstance, MaterialService } from '../services/material.service';
import { SetTagPage } from '../services/page.service';
import { QueryService } from '../services/query.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('parallax1') plxRef1: ElementRef;
  @ViewChild('parallax2') plxRef2: ElementRef;
  @ViewChild('parallax3') plxRef3: ElementRef;
  @ViewChild('parallax4') plxRef4: ElementRef;

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
