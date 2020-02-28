import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ContentChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialInstance, MaterialService } from 'src/app/services/material.service';
import { SetTagPage } from 'src/app/services/page.service';
import { QueryService } from 'src/app/services/query.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userlayout',
  templateUrl: './userlayout.component.html',
  styleUrls: ['./userlayout.component.css']
})
export class UserlayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  sidenavmain: MaterialInstance;
  navbar: MaterialInstance;
  @ViewChild('sidenavmain', { static: false }) sideRef: ElementRef;
  @ViewChild('navbar', { static: false }) navRef: ElementRef;

// ----------------------------------
  redirectFunction(str: string) {
    this.router.navigate([str]);
    this.sidenavmain.close();
  }
  // --------------------------------------------------
    maxMobileWidthPx = 600;

  isMobile = () => {
    return window.innerWidth <= this.maxMobileWidthPx;
  }

  constructor(private router: Router, private tagPage: SetTagPage, private query: QueryService, public auth: AuthService) {

  }

  ngOnInit() {

    // this.navbar = MaterialService.initializeNavbar(this.navRef);
    this.router.navigate(['/main']);


  }
// ---------------------------------------------------
  ngAfterViewInit() {
    this.navbar = MaterialService.initializeNavbar(this.navRef);
    this.sidenavmain = MaterialService.initializeSideBar(this.sideRef);
  }
  // ----------------------------------------------------
  ngOnDestroy() {
    this.sidenavmain.destroy();

  }
  // --------------------------------------------------
  logout() {
    this.auth.logout();
    this.router.navigate(['/main']);
  }
  // -----------------------------------------------------
  openMenu() {
    if (this.sidenavmain) {
      this.sidenavmain.open();
    }

  }
  // -----------------------------------------------------
  login() {
    this.router.navigate(['/login']);
    this.sidenavmain.close();
  }
  // -----------------------------------------------------
  register() {
    this.router.navigate(['/register']);
    this.sidenavmain.close();
  }
  // -----------------------------------------------------
  lk() {
    this.router.navigate(['/lk']);
    this.sidenavmain.close();
  }
  // -----------------------------------------------------
  admin() {
    this.router.navigate(['/admin/query']);
    this.sidenavmain.close();
  }
  // -----------------------------------------------------
  navbarShow() {
    this.navbar.open();
  }
}
