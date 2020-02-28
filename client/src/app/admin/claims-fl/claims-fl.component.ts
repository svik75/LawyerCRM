import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ClaimService } from 'src/app/services/claim.service';
import { Claim, HistoryOrders, Filter } from 'src/app/services/interfaces';
import { MaterialInstance, MaterialService } from 'src/app/services/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-claims-fl',
  templateUrl: './claims-fl.component.html',
  styleUrls: ['./claims-fl.component.css']
})
export class ClaimsFLComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('floatBtn', null) floatBtnRef: ElementRef;
  @ViewChild('formSelect', null) formSelectRef: ElementRef;
  @ViewChild('date', null) dateRef: ElementRef;
  formSelect: MaterialInstance;
  floatBtn: MaterialInstance;
  datePicker: MaterialInstance;

  isLoading = false;
  isEditing = false;
  isAdding = false;
  isFilterVisible = false;
  claims: Claim[] = [];
  form: FormGroup;
  links = ['', 'Новый', 'В работе', 'Встреча', 'Ответили', 'Договор', 'Спам', 'Архив'];
  history: HistoryOrders[] = [];
  selectedStatus = '';
  currentClaim: Claim;
  currentId: string;
  aSub: Subscription;

  filter: Filter = {};
  LIMIT = 10; // count of docs in query
  SKIP = 0; // how much docs skip
  noMoreItems = false;
  oSub: Subscription;

  constructor(private claim: ClaimService, private auth: AuthService) { }

  maxMobileWidthPx = 600;
  isMobile = () => {
    return window.innerWidth <= this.maxMobileWidthPx;
  }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      history: new FormControl(null),
      date: new FormControl(new Date()),
      comments: new FormControl('', Validators.required),
      queryPath: new FormControl('')
    });
    this.isLoading = true;
    this.fetch();

    // this.claim.getClaimFl().subscribe(
    //  cl => { this.claims = cl; });
    this.isLoading = false;
  }
  // -------------------------------------------
  ngAfterViewInit() {
    this.floatBtn = MaterialService.initializeFloatingButton(this.floatBtnRef);
    this.formSelect = MaterialService.initializeSelect(this.formSelectRef);
    this.datePicker = MaterialService.initDatepicker(this.dateRef, this.onCloseDatePicker.bind(this));

  }
  // ----------------------------------------------
  private fetch() {

    const params = Object.assign({}, this.filter, {
      offset: this.SKIP,
      limit: this.LIMIT
    });
    this.oSub = this.claim.getClaimFl(params).subscribe(
      (queryesFrom => {
        this.claims = queryesFrom;
        if (this.claims.length < this.LIMIT) {
          this.noMoreItems = true;
        } else { this.noMoreItems = false; }
      }));



    this.isLoading = false;

    // if (!this.orders.length) { MaterialService.toast('Пустой массив orders!'); }
  }
// ----------------------------------
  onCloseDatePicker() {

  }
// -------------------------------------
  onFilterClick() {

    this.isFilterVisible = !this.isFilterVisible;
  }
// -----------------------------------
  applyFilter(filter: Filter) {
    this.filter = filter;
    if (filter === {}) {this.LIMIT = 10; this.noMoreItems = false;}
    // this.reloading = true;
    this.fetch();
  }
// ------------------------------------------------
  loadMore() {
    this.LIMIT += 5;

    this.fetch();
  }
  // -------------------------------------------
  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0;
  }
//  -----------------------------------------
  edit(claim) {
    this.isEditing = true;
    this.form.reset();
    this.currentId = claim._id;
    this.form.patchValue({
      name: claim.name, phone: claim.phone, email: claim.email,
      history: claim.history, date: claim.date, status: claim.status, queryPath: claim.queryPath
    });
    // this.formSelectRef.nativeElement.selected = query.status;
    this.history = claim.history;
    this.selectedStatus = claim.status;
    this.currentClaim = claim;

  }
  // ----------------------------------------

  addClaim() {
    this.isAdding = true;
    this.form.reset();
    this.form.patchValue({ date: new Date(), status: 'Новый', queryPath: 'Ручное добавление', histroy: null });
  }
  // ----------------------------------------
  onSubmit() {
    const cDate = new Date();

    if (this.history === null) {
      this.history = [];
    }

    this.history.push({
      date: cDate, event: this.form.value.status,
      comments: this.form.value.comments, user: this.auth.getUserName()
    });

    const newClaim: Claim = {
      name: this.form.value.name,
      email: this.form.value.email,
      status: this.form.value.status,
      phone: this.form.value.phone,
      history: this.history,
      date: this.form.value.date,
      queryPath: this.form.value.queryPath,
      isCompany: false,
      _id: this.currentId
    };
    if (newClaim.status === 'Архив') {
      newClaim.done = true;
    }
    this.form.disable();
    if (this.isEditing) { // update
      this.aSub = this.claim.update(newClaim).subscribe(
        (q) => {
          const idx = this.claims.findIndex(p => p._id === q._id);
          this.claims[idx] = newClaim;
          if (newClaim.status === 'Архив') {
            MaterialService.toast('Изменения успешно сохранены и заявка переведена в неактивные!');
          } else {
            MaterialService.toast('Изменения успешно сохранены!');
          }

        },
        error => {
          MaterialService.toast(error.error.message); this.form.enable();
        }
      );
    } else { // create new
      this.aSub = this.claim.create(newClaim).subscribe(
        (q) => {
          this.claims.push(newClaim);
          MaterialService.toast('Заявка успешно добавлена!');
        },
        error => {
          MaterialService.toast(error.error.message); this.form.enable();
        }
      );
    }


    this.form.enable();
    this.isEditing = false;
    this.isAdding = false;
  }
// --------------------------------------------
  onCancel() {
    this.isEditing = false;
    this.isAdding = false;

  }

  ngOnDestroy() {
    this.formSelect.destroy();
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
