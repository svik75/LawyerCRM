import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QueryService } from '../services/query.service';
import { Router } from '@angular/router';
import { MaterialService } from '../services/material.service';
import { Subscription } from 'rxjs';
import { Query } from 'src/app/services/interfaces';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  form: FormGroup;
  myQuery: Query;
  aSub: Subscription;

  constructor(private query: QueryService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    if (this.auth.isAuthenticated) {
      this.form = new FormGroup({
        query: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        name: new FormControl(this.auth.getUserName(), [Validators.required,Validators.pattern(/^[А-Яа-я]*$/)]),
        email: new FormControl(this.auth.getUserEmail(), [Validators.required, Validators.email]),
        phone: new FormControl(this.auth.getUserPhone(), [Validators.required, Validators.pattern(/^[0-9]\d*$/)])
      });
    } else {
      this.form = new FormGroup({
        query: new FormControl(null, Validators.required),
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required),
        phone: new FormControl(null, Validators.required)
      });
    }

  }
  // -------------------------------------
  onSubmit() {

    // this.historyOrder.event = 'Новый';
    // this.historyOrder.date = new Date();
    // this.historyOrder.comments = '';
    this.myQuery = {};
    this.myQuery.status = 'Новый';
    this.myQuery.name = this.form.value.name;
    this.myQuery.query = this.form.value.query;
    this.myQuery.email = this.form.value.email;
    this.myQuery.phone = this.form.value.phone;
    this.myQuery.done = false;
    this.myQuery.history = null;
    this.myQuery.queryPath = this.query.getQueryPath();
    this.form.disable();
    this.aSub = this.query.create(this.myQuery).subscribe(
      () => {
        this.router.navigate(['/create'], { replaceUrl: true });
      },
      error => {
        MaterialService.toast(error.error.message); this.form.enable();
      },
      () => {
        MaterialService.toast('Ваш вопрос отправлен юристам!');

      }
    );
  }
  // --------------------------------------
  onSubmitQuestion() {

  }
  // --------------------------------------

  onCancel() {

    this.router.navigate(['/main']);


  }

}
