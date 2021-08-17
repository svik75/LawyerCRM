import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/services/interfaces';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild('check') chRef: ElementRef;
  users$: Observable<User[]>;
  users: User[] = [];
  dSub: Subscription;
  uSub: Subscription;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getAll().subscribe(
      u => this.users = u);
  }
// ------------------------------------------------------------
  delete(event: Event, user: User) {
    event.stopPropagation();
    const decision = window.confirm(`Удалить пользователя? - ${user.name}`);
    if (decision) {
      this.dSub = this.auth.delete(user).subscribe(
        (query) => {
          const idx = this.users.findIndex(p => p.email === query.email);
          this.users.splice(idx, 1);
        });
      MaterialService.toast(`Пользователь ${user.name} удален!`);
    } else {

    }
  }
// -------------------------------------------------------------
  onChange(event: Event, user: User) {
    let answ: boolean;
    event.stopPropagation();
    if (user.isAdmin) {
      answ = window.confirm(`Убрать права администратора у ${user.name}?`);

    } else {
      answ = window.confirm(`Уcтановить права администратора у ${user.name}?`);
    }
    if (answ) {
      user.isAdmin = !user.isAdmin;

      this.uSub = this.auth.updateAdmin(user).subscribe();
      MaterialService.toast('Права пользователя изменены');
    } else {
       // user.isAdmin = !!user.isAdmin;
      /* if(this.chRef.nativeElement.checked){this.chRef.nativeElement.checked = false;
      } else {
        this.chRef.nativeElement.checked = true;
      }*/


    }

  }
// ----------------------------------------------------------------------
  ngOnDestroy() {
    if (this.dSub) { this.dSub.unsubscribe(); }
    if (this.uSub) { this.uSub.unsubscribe(); }
  }
}
