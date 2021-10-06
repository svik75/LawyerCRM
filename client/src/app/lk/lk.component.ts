import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../services/interfaces';
import { MaterialService } from '../services/material.service';



@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.css']
})

export class LkComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub: Subscription;
  user$: Observable<User>;
  userEmail = '';
  btnTitle: string;
  isEditing = false;


  constructor(private auth: AuthService) {

    this.form = new FormGroup(
      {
        name: new FormControl(null, [Validators.required]),
        phone: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }
    );
  }

  ngOnInit() {

    try {
      if (this.auth.isAuthenticated()) {
        this.userEmail = this.auth.getUserEmail();
        this.btnTitle = 'Редактировать';
        this.user$ = this.auth.getByEmail(this.userEmail);
        this.aSub = this.user$.subscribe(
          (u) => { this.form.patchValue({ name: u.name, phone: u.phone, email: u.email }); },
          error => console.log(error));
        this.form.disable();
      }
    } catch (error) { console.log(error); }
  }


  onSubmit() {
    this.form.disable();
    this.aSub = this.auth.update(this.form.value).subscribe(
      () => {
        MaterialService.toast('Изменения успешно сохранены!');
      },
      error => {
        MaterialService.toast(error.error.message); this.form.enable();
      }
    );
  }


onEdit() {
  this.isEditing = !this.isEditing;
  if (this.isEditing === false) {
    this.form.disable(); this.btnTitle = 'Редактировать';
  } else {
    this.form.enable(); this.btnTitle = 'Отменить';
  }
}

ngOnDestroy() {
  if (this.aSub) {
    this.aSub.unsubscribe();

  }
}

}
