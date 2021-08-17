import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: Label[] = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public dolg = 0;
  public cred = 0;
  public dohod = 0;
  public costB = 0;
  public regMsc = false;
  showGrPl = false;


  public barChartData: ChartDataSets[] = [
    { data: [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000], label: 'Оплата за услуги' },
    { data: [12800, 0, 12500, 0, 0, 0, 0, 0, 0, 0], label: 'Оплата в суд' },

  ];
  public month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  constructor() { }

  ngOnInit() {
    const cDate = new Date();
    const cMonth = cDate.getMonth();
    for (let i = 0; i < 10; i++) {
    //  this.barChartLabels[i] = (cMonth + i) > 11 ? this.month[cMonth - 12 + i] : this.month[cMonth + i];
    }

  }

  onSubmit() {

  }
  // --------------------------------------------------
  ShowGP() {
    const monthCost = Math.round(this.costB / 10);
    this.barChartData = [
      // tslint:disable-next-line: max-line-length
      { data: [monthCost, monthCost, monthCost, monthCost, monthCost, monthCost, monthCost, monthCost, monthCost, monthCost], label: 'Оплата за услуги' },
      { data: [12800, 0, 12500, 0, 0, 0, 0, 0, 0, 0], label: 'Оплата в суд' },
    ];

    this.showGrPl = true;
  }
  // ------------------------------------------------------
  calcCostB() {
    this.costB = 125000;
    if (this.regMsc) { // прописан в Москве или области
      if (this.dolg >= 5000000 && this.dolg <= 10000000) {
        this.costB += 30000;
      }
      if (this.dolg > 10000000) {
        this.costB += 50000;
      }
      if (this.cred > 3) {
        this.costB += 20000;
      }
      if (this.dohod > 30000) {
        this.costB += 20000;
      }

    } else { // в другом регионе плюс 30 000
      this.costB += 30000;
      if (this.dolg >= 5000000 && this.dolg <= 10000000) {
        this.costB += 30000;
      }
      if (this.dolg > 10000000) {
        this.costB += 50000;
      }
      if (this.cred > 3) {
        this.costB += 20000;
      }
      if (this.dohod > 30000) {
        this.costB += 20000;
      }
    }
  }

  valueChanged(e) {
    this.dolg = e.target.value;
    this.calcCostB();
  }

  valueChangedCred(e) {
    this.cred = e.target.value;
    this.calcCostB();
  }

  valueChangedDohod(e) {
    this.dohod = e.target.value;
    this.calcCostB();
  }

  valueChangedRegMsc(e) {
    if (e.target.checked) {
      this.regMsc = true;
    } else {
      this.regMsc = false;
    }

    this.calcCostB();
  }

}
