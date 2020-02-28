import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  showGrPl = false;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Аванс (%)', 'Назначение заседания (%)', 'Первое заседание (%)'];
  public barChartType: ChartType = 'pie';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [20, 30, 50], label: 'График платежей по договору (в процентах)' }
  ];

  constructor() { }

  ngOnInit() {
  }

  ShowGP() {
    this.showGrPl = !this.showGrPl;
  }

}
