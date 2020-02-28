import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy, ContentChild, TemplateRef, AfterContentInit } from '@angular/core';
import { QueryService } from 'src/app/services/query.service';
import { Observable, Subscription } from 'rxjs';
import { Query, HistoryOrders, User, Filter } from 'src/app/services/interfaces';
import { MaterialService, MaterialInstance } from 'src/app/services/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentInit {
  @ViewChild('formSelect', null) formSelectRef: ElementRef;


  isFilterVisible = false;
  isEditing = false;
  filter: Filter = {};
  LIMIT = 10; // count of docs in query
  SKIP = 0; // how much docs skip
  noMoreItems = false;
  oSub: Subscription;

  currentId: string;
  isLoading = false;
  queries: Query[] = [];
  currentQuery = 0;
  history: HistoryOrders[] = [];
  form: FormGroup;
  formSelect: MaterialInstance;
  aSub: Subscription;

  links = ['', 'Новый', 'В работе', 'Встреча', 'Ответили', 'Договор', 'Спам', 'Архив'];
  selectedStatus = '';

  constructor(private query: QueryService, private auth: AuthService) { }

  ngOnInit() {
    this.isLoading = true;

    this.fetch();
    this.form = new FormGroup({
      query: new FormControl(null),
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      history: new FormControl(null),
      date: new FormControl({ value: new Date(), disabled: true }),
      comments: new FormControl({ value: '', disabled: false }),
      queryPath: new FormControl({ value: '', disabled: true })
    });
    this.isLoading = false; this.isEditing = false;

  }

  ngAfterViewInit() {
    this.formSelect = MaterialService.initializeSelect(this.formSelectRef);

  }

  ngAfterContentInit() {

    // console.log( this.defaultTabButtonsTpl);
    // this.formSelectRef = this.defaultTabButtonsTpl.elementRef.nativeElement.querySelector('#formSelect');
  }

  ngOnDestroy() {
    this.formSelect.destroy();
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
    if (this.oSub) {
      this.oSub.unsubscribe();
    }
  }

  edit(query) {

    this.isEditing = true;
    this.form.reset();
    this.currentId = query._id;
    this.form.patchValue({
      name: query.name, phone: query.phone, email: query.email, query: query.query,
      history: query.history, date: query.date, status: query.status, queryPath: query.queryPath
    });
    // this.formSelectRef.nativeElement.selected = query.status;
    this.history = query.history;
    this.selectedStatus = query.status;
    this.currentQuery = query;
    // this.formSelectRef.nativeElement.value = query.status;
    // this.form.setValue({status: query.status}, {onlySelf: true});

  }

  onCancel() {
    this.isEditing = false;
  }

  done(event: Event, query: Query) {
    const ask = window.confirm('Завершить работу с вопросом?');
    if (ask) {

    } else {

    }
  }

  onSubmit() {
    const cDate = new Date();

    if (this.history === null) {
      this.history = [];
    }

    this.history.push({
      date: cDate, event: this.form.value.status,
      comments: this.form.value.comments, user: this.auth.getUserName()
    });

    const newQuery: Query = {
      name: this.form.value.name,
      email: this.form.value.email,
      status: this.form.value.status,
      query: this.form.value.query,
      phone: this.form.value.phone,
      history: this.history,
      date: this.form.value.date,
      queryPath: this.form.value.queryPath,
      _id: this.currentId
    };
    if (newQuery.status === 'Архив') {
      newQuery.done = true;
    }


    this.form.disable();
    this.aSub = this.query.update(newQuery).subscribe(
      (q) => {
        const idx = this.queries.findIndex(p => p._id === q._id);
        this.queries[idx] = newQuery;
        if (newQuery.status === 'Архив') {
          MaterialService.toast('Изменения успешно сохранены и вопрос переведен в неактивные!');
        } else {
          MaterialService.toast('Изменения успешно сохранены!');
        }

      },
      error => {
        MaterialService.toast(error.error.message); this.form.enable();
      }
    );

    this.form.enable();
    this.isEditing = false;

  }
  // ----------------------------------------------
  private fetch() {

    const params = Object.assign({}, this.filter, {
      offset: this.SKIP,
      limit: this.LIMIT
    });
    this.oSub = this.query.getAll(params).subscribe(
      (queryesFrom => {
        this.queries = queryesFrom;
        if (this.queries.length < this.LIMIT) {
          this.noMoreItems = true;
        } else { this.noMoreItems = false; }
      }));



    this.isLoading = false;

    // if (!this.orders.length) { MaterialService.toast('Пустой массив orders!'); }
  }
  // ------------------------------------------------
  loadMore() {
    this.LIMIT += 5;

    this.fetch();
  }
  // ------------------------------------------------
  loadLess() {
    this.SKIP -= 5;

    this.fetch();
  }
  // -----------------------------------------------
  applyFilter(filter: Filter) {

    // this.offset = 0;
    this.filter = filter;
    if (filter === {}) {this.LIMIT = 10; this.noMoreItems = false;}
    // this.reloading = true;
    this.fetch();
  }
  // ----------------------------------------
  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0;
  }
  // ----------------------------------------

  onFilterClick() {

    this.isFilterVisible = !this.isFilterVisible;
  }


}
