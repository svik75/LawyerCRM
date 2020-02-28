import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { MaterialService } from './material.service';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private auth: AuthService, private router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    if (this.auth.isAuthenticated()) {
      return of(true);
    } else {
      MaterialService.toast('Сначала войдите в систему!');
      try {
        this.router.navigate(['/login'], {
          queryParams: { accessDenied: true }
        });
      } catch (error) { MaterialService.toast(error); }
    }
    return of(false);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.auth.isAdmin()) {
     return this.canActivate(route, state);
    } else {
      MaterialService.toast('Вы должны иметь права администратора!');
      this.router.navigate(['/login']);
      return of(false);
    }

  }

}
