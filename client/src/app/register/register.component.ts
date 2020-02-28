import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub: Subscription;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup(
      {
        name: new FormControl(null, [Validators.required]),
        phone: new FormControl(null, [Validators.required] ),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }
    );
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
  }
}

  onSubmit() {
    this.form.disable();
    this.aSub = this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'], { queryParams: { registered: true } });
      },
      error => {
        MaterialService.toast(error.error.message); this.form.enable();
      },
      () => { console.log('Completed'); }
    );
  }

}
