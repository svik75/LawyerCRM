// tslint:disable-next-line: semicolon
import { HttpClient } from '@angular/common//http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './interfaces';
import { MaterialService } from './material.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private token = null;



  constructor(private http: HttpClient) {

  }
  // ------------------------------------------
  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user);
  }
  // ------------------------------------------
  delete(user: User): Observable<User> {
    return this.http.delete<User>(`/api/auth/${user.email}`);
  }
  // ------------------------------------------
  update(user: User): Observable<User> {
    return this.http.patch<User>('/api/auth/patch', user);
  }
  // ------------------------------------------
  updateAdmin(user: User): Observable<User> {

    return this.http.patch<User>('/api/auth/patchadmin', user);
  }
  // ----------------------------------------
  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(
          ({ token }) => {
            localStorage.setItem('auth-token', token);
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userName', user.name);
            console.log(user.name);
            if (user.isAdmin === true) {
              localStorage.setItem('isAdmin', 'true');
            } else {

              localStorage.setItem('isAdmin', 'false');
            }

            this.setToken(token);
          }
        )
      );

  }
  // ----------------------------------------
  setAfterLogin(email: string) {

    this.http.get<User>(`/api/auth/${email}`).subscribe(
      u => {
        localStorage.setItem('userEmail', u.email);
        localStorage.setItem('userName', u.name);
        localStorage.setItem('userPhone', u.phone);
        if (u.isAdmin === true) {
          localStorage.setItem('isAdmin', 'true');
        } else {

          localStorage.setItem('isAdmin', 'false');
        }

      }
    );



}

// ---------------------------------------------
getAll(): Observable < User[] > {
  return this.http.get<User[]>(`/api/auth/`);
}
// ---------------------------------------------
getByEmail(email: string): Observable < User > {
  return this.http.get<User>(`/api/auth/${email}`);
}
// ---------------------------------------------
getUserEmail(): string {
  return localStorage.getItem('userEmail');
}
// ---------------------------------------------
getUserName(): string {
  return localStorage.getItem('userName');
}
// ---------------------------------------------
getUserPhone(): string {
  return localStorage.getItem('userPhone');
}
// ------------------------------------------
setToken(token: string) {
  this.token = token;
}
// ------------------------------------------
getToken(): string {
  return this.token;
}
// ------------------------------------------
isAuthenticated(): boolean {
  return !!this.token;
}
// ------------------------------------------
isAdmin(): boolean {
  const str = localStorage.getItem('isAdmin');

  if (str === 'true') {
    return true;
  } else {
    return false;
  }
}
// -------------------------------------------
logout() {
  this.setToken(null);
  localStorage.clear();
  MaterialService.toast('Вы вышли из системы.');
}
}
