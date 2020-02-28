import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { Filter } from 'src/app/services/interfaces';
import { MaterialInstance, MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-query-filter',
  templateUrl: './query-filter.component.html',
  styleUrls: ['./query-filter.component.css']
})
export class QueryFilterComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() onFilter = new EventEmitter<Filter>();
  @ViewChild('start', null) startRef: ElementRef;
  @ViewChild('end', null) endRef: ElementRef;
  @ViewChild('isDone', null) doneRef: ElementRef;
  @ViewChild('formSelect', null) formSelectRef: ElementRef;
  @Input() chLink: [];



  filter: Filter = {};
  startDate: MaterialInstance;
  endDate: MaterialInstance;
  formSelect: MaterialInstance;
  done: boolean;
  isValid = false;
  selectedValue = '';

  links = ['', 'Новый', 'В работе', 'Встреча', 'Ответили', 'Договор', 'Спам', 'Архив'];

  constructor() { }

  ngOnInit() {
    this.links = this.chLink;
  }
  // -------------------------------------------------
  submitFilter() {
    // if (this.checkRef.nativeElement.checked) { filter.done = true; }
    if (this.startRef.nativeElement.value) {
      this.filter.startDate = this.startRef.nativeElement.value;
    }
    if (this.endRef.nativeElement.value) {
      this.filter.endDate = this.endRef.nativeElement.value;
    }
    if (this.formSelectRef.nativeElement.value) {
      this.filter.status = this.formSelectRef.nativeElement.value;
    }
    this.onFilter.emit(this.filter);
  }
  // -------------------------------------------------
  submitFilterNull() {
    this.filter = {};
    this.startRef.nativeElement.value = null;
    this.endRef.nativeElement.value = null;
    this.selectedValue = null;
    this.onFilter.emit(this.filter);

  }
  // -----------------------------------------------------
  ngAfterViewInit() {
    this.startDate = MaterialService.initDatepicker(this.startRef, this.Validate.bind(this));
    this.endDate = MaterialService.initDatepicker(this.endRef, this.Validate.bind(this));
    this.formSelect = MaterialService.initializeSelect(this.formSelectRef);
  }
  // ------------------------------------------------------
  ngOnDestroy() {
    this.startDate.destroy();
    this.endDate.destroy();
    this.formSelect.destroy();
  }
  // ------------------------------------------------------
  Validate() {
    console.log(this.selectedValue);
    if (!this.startRef.nativeElement.value || !this.endRef.nativeElement.value || this.formSelectRef.nativeElement.selected !== '') {
      this.isValid = true;
      return;
    }

    if (this.startRef.nativeElement.value < this.endRef.nativeElement.value) {
      this.isValid = true;
    } else { this.isValid = false; }
  }



}
