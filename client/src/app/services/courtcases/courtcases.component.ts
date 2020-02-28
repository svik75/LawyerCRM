import { Component, OnInit, Input } from '@angular/core';
import { courtCases } from '../data';


@Component({
  selector: 'app-courtcases',
  templateUrl: './courtcases.component.html',
  styleUrls: ['./courtcases.component.css']
})
export class CourtcasesComponent implements OnInit {
  @Input() courtId: boolean;
  courtCases: any[] = [];
  maxMobileWidthPx = 600;
  currentCourt = '';

  isMobile = () => {
    return window.innerWidth <= this.maxMobileWidthPx;
  }


  constructor() { }

  ngOnInit() {
    Object.assign(this, { courtCases });
    this.currentCourt = localStorage.getItem('currentCourt');
  }

}
