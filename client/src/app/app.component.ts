import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { MaterialInstance, MaterialService } from './services/material.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
declare var M;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

constructor(private auth: AuthService, private router: Router) {

}



  @ViewChild('sidebar') sidebarRef: ElementRef;


  // sidebar: MaterialInstance;
  ngOnInit() {

    const potentialToken = localStorage.getItem('auth-token');
    if (potentialToken !== null) { this.auth.setToken(potentialToken); }
  }

  ngOnDestroy() {
   // this.sidebar.destroy();
  }

  ngAfterViewInit() {

    // this.sidebar = MaterialService.initializeSideBar(this.sidebarRef);
  }



}
