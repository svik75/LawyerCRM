import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, DefaultIterableDiffer } from '@angular/core';
import { Contracts, Payments, Filter } from 'src/app/services/interfaces';
import { ContractService } from 'src/app/services/contract.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialService, MaterialInstance } from 'src/app/services/material.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('floatBtn', null) floatBtnRef: ElementRef;
  @ViewChild('formSelect', null) formSelectRef: ElementRef;
  @ViewChild('formSelectPayment', null) formSelectRefPayment: ElementRef;
  @ViewChild('modal', null) modalRef: ElementRef;
  @ViewChild('dateP1', null) dateRef1: ElementRef;
  @ViewChild('dateP2', null) dateRef2: ElementRef;


  datePicker1: MaterialInstance;
  datePicker2: MaterialInstance;

  formSelect: MaterialInstance;
  formSelectPayment: MaterialInstance;
  modal: MaterialInstance;
  floatBtn: MaterialInstance;

  contracts: Contracts[] = [];
  currentContract: Contracts;
  payments: Payments[] = [];

  isFilterVisible = false;
  isEditing = false;
  filter: Filter = {};
  LIMIT = 10; // count of docs in query
  SKIP = 0; // how much docs skip
  noMoreItems = false;
  oSub: Subscription;


  links = ['', 'На подписании', 'Подписан', 'Завершен', 'Расторгнут', 'Не заключен', 'Архив'];
  paymentType = ['', 'Наличные', 'На счет', 'На карту'];

  isAdding = false;
  isLoading = false;
  isAddingPayment = false;

  currentId: string;
  aSub: Subscription;
  form: FormGroup;
  formPayment: FormGroup;

  constructor(private contractS: ContractService, private auth: AuthService) { }
  // -------------------------------------------
  ngOnInit() {
    this.fetch();

    // this.contractS.getContracts().subscribe(
      // cl => this.contracts = cl);

    this.form = new FormGroup({
      date: new FormControl(new Date()),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      contractDescription: new FormControl('', Validators.required),
      contractSum: new FormControl(0, Validators.required),
      payments: new FormControl(null),
      debt: new FormControl(0),
      comments: new FormControl('', Validators.required),
    });

    this.formPayment = new FormGroup({
      date: new FormControl(new Date()),
      sum: new FormControl(0, [Validators.required, Validators.min(1)]),
      paymentType: new FormControl('', Validators.required)
    });
  }
  // -----------------------------------------
  ngAfterViewInit() {
    this.floatBtn = MaterialService.initializeFloatingButton(this.floatBtnRef);
    this.formSelect = MaterialService.initializeSelect(this.formSelectRef);
    this.formSelectPayment = MaterialService.initializeSelect(this.formSelectRefPayment);
    this.modal = MaterialService.initModal(this.modalRef);
    this.datePicker1 = MaterialService.initDatepicker(this.dateRef1, this.onCloseDatePicker.bind(this));
    this.datePicker2 = MaterialService.initDatepicker(this.dateRef2, this.onCloseDatePicker.bind(this));

  }
// ----------------------------------------------
private fetch() {

  const params = Object.assign({}, this.filter, {
    offset: this.SKIP,
    limit: this.LIMIT
  });
  this.oSub = this.contractS.getContracts(params).subscribe(
    (queryesFrom => {
      this.contracts = queryesFrom;
      if (this.contracts.length < this.LIMIT) {
        this.noMoreItems = true;
      } else { this.noMoreItems = false; }
    }));



  this.isLoading = false;

  // if (!this.orders.length) { MaterialService.toast('Пустой массив orders!'); }
}
// ------------------------------------------------
  onCloseDatePicker() {

  }

  // ------------------------------------------------
  loadMore() {
    this.LIMIT += 5;

    this.fetch();
  }
  // ------------------------------------------
  applyFilter(filter: Filter) {

    // this.offset = 0;
    this.filter = filter;
    if (filter === {}) {this.LIMIT = 10; this.noMoreItems = false;}
    // this.reloading = true;
    this.fetch();
  }
  // ------------------------------------------
  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0;
  }
  // -------------------------------------------

  onFilterClick() {

    this.isFilterVisible = !this.isFilterVisible;
  }
   // ----------------------------------------

  edit(contract) {
    this.payments = contract.payments;
    this.isEditing = true;
    this.form.reset();
    this.currentId = contract._id;
    this.currentContract = contract;
    this.form.patchValue({
      name: contract.name, phone: contract.phone, email: contract.email,
      payments: contract.payments, date: contract.date, status: contract.status, contractSum: contract.contractSum,
      contractDescription: contract.contractDescription, comments: contract.comments
    });

  }
  // ------------------------------------------
  addContract() {
    this.isAdding = true;
    this.form.reset();
    this.form.patchValue({ date: new Date(), status: 'Новый', payments: null });

  }
  // ------------------------------------------
  addPayment() {
    this.modal.open();
  }
  // ------------------------------------------

  onSubmitPayment() {
    this.payments.push({
      date: this.formPayment.value.date,
      sum: this.formPayment.value.sum, paymentType: this.formPayment.value.paymentType
    });
    this.modal.close();
    MaterialService.toast('Платеж добавлен!');
  }
  // ------------------------------------------
  onCancelPayment() {

    this.modal.close();
  }
  // --------------------------------------------
  calcDebt(): number {
    const total = this.payments.reduce((totalS, item) =>
      totalS + item.sum, 0);
    if (this.currentContract == null) {
      return total;
    }

    return (this.currentContract.contractSum - total);
  }
  // --------------------------------------------

  onCancel() {
    this.isEditing = false;
    this.isAdding = false;
  }
  // ---------------------------------------------
  ngOnDestroy() {
    this.modal.destroy();
    this.floatBtn.destroy();
    this.formSelect.destroy();
    this.formSelectPayment.destroy();
    this.datePicker1.destroy();
    this.datePicker2.destroy();
  }
  // -------------------------------------------
  onSubmit() {
    const cDate = new Date();

    if (this.payments === null) {
      this.payments = [];
    }

    const newContract: Contracts = {
      name: this.form.value.name,
      email: this.form.value.email,
      status: this.form.value.status,
      phone: this.form.value.phone,
      payments: this.payments,
      date: this.form.value.date,
      contractSum: this.form.value.contractSum,
      contractDescription: this.form.value.contractDescription,
      comments: this.form.value.comments,
      isCompany: this.form.value.isCompany,
      debt: 0,
      _id: this.currentId
    };
    this.currentContract = newContract;
    newContract.debt = this.calcDebt();

    if (newContract.status === 'Архив') {
      newContract.done = true;
    }
    this.form.disable();
    if (this.isEditing) { // update
      this.aSub = this.contractS.update(newContract).subscribe(
        (q) => {
          const idx = this.contracts.findIndex(p => p._id === q._id);
          this.contracts[idx] = newContract;
          if (newContract.status === 'Архив') {
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
      this.aSub = this.contractS.create(newContract).subscribe(
        (q) => {
          this.contracts.push(newContract);
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

}
