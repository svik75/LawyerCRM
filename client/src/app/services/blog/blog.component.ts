import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { list } from '../data';
import { blog } from '../data';

import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, AfterViewInit, OnDestroy {
  list: any[] = [];
  blog: any[] = [];
  quizFinished = false;
  selectedId = 0;
  currentUid = 0;
  @ViewChild('collapsible', null) elCollapsible: ElementRef;

  constructor() { }

  ngOnInit() {
    Object.assign(this, { list });
    Object.assign(this, { blog });
  }

  ngAfterViewInit() {
        const instanceCollapsible = new M.Collapsible(this.elCollapsible.nativeElement, {});

  }

  onClickBack() {

  }

  onClick(item) {

  }
// ----------------------------------
  returnDescription(uid: number) {

    const idx = blog.findIndex((p) => p.uid === uid);
    console.log(uid);
    if (idx >= 0) {
      return blog[idx].descr;
    } else {
      return '';
    }
  }
// --------------------------------
  returnCategoryName(uid: number) {
    const index = list.findIndex(p => p.uid === uid);

    if (index >= 0) {
      return list[index].name;
    } else {
      return '';
    }


  }
// ----------------------------------
  returnPrice(currentUid) {

  }

  ngOnDestroy() {
  }

}
