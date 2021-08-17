import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { listUl } from '../services/data';
import { Claim } from '../services/interfaces';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QueryService } from '../services/query.service';
import { AuthService } from '../services/auth.service';
import { ClaimService } from '../services/claim.service';
import { blog } from '../services/data';
import { pics } from '../services/data';
import { ulDesciption } from '../services/data';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-uslugi-ul',
  templateUrl: './uslugi-ul.component.html',
  styleUrls: ['./uslugi-ul.component.css']
})
export class UslugiULComponent implements OnInit, OnDestroy {
  listUl: any[] = [];

  claim: Claim;
  aSub: Subscription;
  queryPath: string[] = [];
  quizFinished = false;
  currentId = 1;
  currentUid = 0;
  parent = 0;
  public showBtn = true;
  list: any[] = [];
  blog: any[] = [];
  ulDesciption: any[] = [];
  // chart
  single: any[] = [];
  pics: any[] = [];
  view: any[] = [700, 400];
  pic = ''; // current random pic

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Месяц';
  showYAxisLabel = true;
  yAxisLabel = 'Сумма';
  legendTitle = 'Месяц';
  autoScale = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // -----------------

  form: FormGroup;
  maxMobileWidthPx = 600;
  isMobile = () => {
    return window.innerWidth <= this.maxMobileWidthPx;
  }

  constructor(private chRef: ChangeDetectorRef, private router: Router,
              private queryS: QueryService, private auth: AuthService, private claimS: ClaimService) { }
  // ---------------------------
  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.form = new FormGroup({
        name: new FormControl(this.auth.getUserName(), [Validators.required,Validators.pattern(/^[А-Яа-я]*$/)]),
        phone: new FormControl(this.auth.getUserPhone(), [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
        email: new FormControl(this.auth.getUserEmail(), [Validators.required, Validators.email])
      });
    } else {
      this.form = new FormGroup({
        name: new FormControl(null, [Validators.required,Validators.pattern(/^[А-Яа-я]*$/)]),
        phone: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
        email: new FormControl(null, [Validators.required, Validators.email])
      });
    }

    Object.assign(this, { listUl });
    Object.assign(this, { blog });
    Object.assign(this, { pics });
    Object.assign(this, { ulDesciption });
    localStorage.setItem('currentCourt', '');

  }
  // ---------------------------------------
  onClick(item) {

    if (item.child === -1) { // redirect to question

      this.queryS.setQueryPath(this.queryPath);
      this.router.navigate(['/question']);
    } else {
      if (item.child === 0) { // quiz finished
        this.queryPath.push(item.name);
        this.queryS.setQueryPath(this.queryPath);
        this.currentUid = item.uid;
        this.quizFinished = true;
        localStorage.setItem('currentCourt', item.id.toString());
        this.pic = this.getRandomPic(1, 5);
      } else {
        this.queryPath.push(item.name);
        this.currentId = item.child;
        this.parent = item.id;
        this.currentUid = item.uid;

      }

    }


  }
  // ---------------------------------------
  onClickBack() {
    this.currentId = this.findParent(this.currentId);

    this.showBtn = true;
    this.queryPath.pop();
    if (this.currentId === 1) {
      this.queryPath = [];
      this.showBtn = false;
    }

  }
  // ---------------------------------------

  onClickStart() {
    this.currentId = 1;
    this.quizFinished = false;
    this.queryPath = [];
  }
  // ---------------------------------------
  setBtnCount(): boolean {
    if (this.showBtn) {

      this.showBtn = false; return true;

    }

    return this.showBtn;
  }
  // ---------------------------------
  findParent(item: number): number {
    const idx = listUl.findIndex(p => p.id === item);
    return listUl[idx].parent;
  }
  // ---------------------------------
  findParentUid(parent: number): number {
    const idx = listUl.findIndex(p => p.id === parent);
    return listUl[idx].uid;
  }
  onSubmitQuestion() {
    this.router.navigate(['/question']);
  }
  // ---------------------------------
  onSubmit() {
    this.claim = {};
    this.claim.status = 'Новый';
    this.claim.name = this.form.value.name;
    this.claim.isCompany = true;
    this.claim.email = this.form.value.email;
    this.claim.phone = this.form.value.phone;
    this.claim.done = false;
    this.claim.history = null;
    this.claim.queryPath = this.queryS.getQueryPath();
    this.form.disable();
    this.aSub = this.claimS.create(this.claim).subscribe(
      () => {
        this.router.navigate(['/create'], { replaceUrl: true });
      },
      error => {
        MaterialService.toast(error.error.message); this.form.enable();
      },
      () => {
        MaterialService.toast('Ваша заявка отправлена юристам!');
        MaterialService.toast('В ближайшее время мы свяжемся с вами.');
      }
    );
  }

  // ---------------------- chart event
  onSelect(event) {
  }

  // n----------------------
  onResize(event) { this.view = [event.target.innerWidth - 900, 280]; }
  // -------------------------------------------------
  returnDescription(uid: number): string {
    const idscr = listUl.findIndex((p) => p.uid === this.currentUid);
    const idDescr = listUl[idscr].idDescr;
    const idx = ulDesciption.findIndex((p) => p.uid === idDescr);
    if (idx >= 0) {
      return ulDesciption[idx].descr;
    } else {
      return '';
    }
  }
  // -------------------------------------------------
  returnPrice(uid: number): string {
    const idscr = listUl.findIndex((p) => p.uid === uid);
    const idDescr = listUl[idscr].idDescr;
    const idx = ulDesciption.findIndex((p) => p.uid === idDescr);
    if (idx >= 0) {
      return ulDesciption[idx].cost;
    } else {
      return '';
    }
  }
  // -------------------------------------------------
  returnBlog(uid: number): string {

    const idx = blog.findIndex((p) => p.uid === uid);
    if (idx >= 0) {
      return blog[idx].descr;
    } else {
      return '';
    }
  }
  // ----------------------------------
  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();

    }
  }
  // ----------------------------------

  getRandomPic(min, max) {
    const n = Math.round(Math.random() * (max - min) + min);
    const idx = pics.findIndex(p => p.id === n);
    if (idx >= 0) {
      return pics[idx].path;
    } else {
      return 'assets/1.png';
    }

  }

}
