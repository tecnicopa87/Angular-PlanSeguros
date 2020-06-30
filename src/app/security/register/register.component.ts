import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';/* fundamental Formularios reactivos*/

import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
forma:FormGroup;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }
  private buildForm() {
  
  const dateLength = 10;
  const today = new Date().toISOString().substring(0, dateLength);
  const name = 'JOHN DOE';
  const minPassLength = 4;
  this.forma = this.formBuilder.group({
    registeredOn: today,
    name:[name.toLowerCase(),Validators.required],
    email: ['john@angular.io',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(minPassLength)]]
  });
  }
 public register() {
   const user=this.forma.value;
   console.log(user);
 }
 onSubmit() {
  // TODO: Use EventEmitter with form value
  console.warn(this.forma.value);
}
}
