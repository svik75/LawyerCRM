import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub: Subscription;
  bSub: Subscription;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    const rg = 'registered';
    const acd = 'accessDenied';
    const sesf = 'sessionFailed';
    this.form = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)])
      }
    );

    this.route.queryParams.subscribe((params: Params) => {
      if (params[rg]) {// registered
        MaterialService.toast('Теперь вы можете войти в систему!');
      } else if (params[acd]) {// not registered
        MaterialService.toast('Для начала авторизуйтесь  в системе!');
      } else if (params[sesf]) {
        MaterialService.toast('Пожалуйста, войдите в систему заново!');
      }
    });
  }

  onSubmit() {

    this.form.disable();
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => {
        MaterialService.toast('Вы успешно вошли в систему!');
        this.auth.setAfterLogin(this.form.controls.email.value);
        if (this.auth.isAdmin()) {
          this.router.navigate(['/admin/query']);
        } else {
          this.router.navigate(['/lk']);
        }

      },
      error => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    );


  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }

    if (this.bSub) {
      this.bSub.unsubscribe();
    }
  }

}
