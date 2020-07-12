import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';/* fundamental Formularios reactivos*/
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';/* control calendar bootstrap */

import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  model: NgbDateStruct; /* éstas propiedad requerida por control ngbootstrap*/
  date: { year: number, month: number } /* calendar */

  constructor(private formBuilder: FormBuilder,private ngbCalendar:NgbCalendar) { }

  ngOnInit() {
    this.model = this.ngbCalendar.getToday();
    this.buildForm();
  }
  selectToday() {
    this.model = this.ngbCalendar.getToday();
  }
  private buildForm() {

    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    const name = 'JOHN DOE';
    const minPassLength = 4;
    this.forma = this.formBuilder.group({
      registeredOn: today,
      name: [name.toLowerCase(), Validators.required],
      email: ['john@angular.io', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(minPassLength)]]
    });
  }
  public register() {
    const user = this.forma.value;
    console.log(user);
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.forma.value);
  }
}
