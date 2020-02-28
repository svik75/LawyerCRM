import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MaterialInstance, MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', null) refNav: ElementRef;
  @ViewChild('navbar', null) navRef: ElementRef;

  sidenav: MaterialInstance;
  navbar: MaterialInstance;
  searchText = '';


  links = [
    { url: '/admin/query', name: 'Вопросы с сайта' },
    { url: '/admin/claimsUL', name: 'Заявки ЮЛ' },
    { url: '/admin/claimsFL', name: 'Заявки ФЛ' },
    { url: '/admin/contracts', name: 'Работа с договорами' },
    { url: '/admin/users', name: 'Пользователи' },
    { url: '/admin/reports', name: 'Отчеты' }

  ];

  constructor(public auth: AuthService, private router: Router) { }
maxMobileWidthPx = 600;
  isMobile = () => {
    return window.innerWidth <= this.maxMobileWidthPx;
  }

  ngOnInit() {
      this.sidenav = MaterialService.initializeSideBar(this.refNav);

    this.navbar = MaterialService.initializeNavbar(this.navRef);
    if (this.isMobile()) {
      this.sidenav.open();
    }
  }

  ngOnDestroy() {
    this.sidenav.destroy();
  }



  openMenu() {
    this.sidenav.open();
  }

  // -------------------------------------------------
  search() {
    MaterialService.toast(this.searchText);

  }

  // --------------------------------------------------
  logout() {
    this.auth.logout();
    this.router.navigate(['/main']);
  }

  // -----------------------------------------------------
  redirectFunction(str: string) {
    this.router.navigate([str]);
    this.sidenav.close();
  }
  // -----------------------------------------------------


}
