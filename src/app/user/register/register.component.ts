import { Component } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  // --- alert properties ---
  showAlert = false
  alertMsg = 'Please wait! Your account is being created'
  alertColor = 'blue'
  // --- alert properties ---



  // force FormControl type
  name = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email = new UntypedFormControl('', [
    Validators.required,
    Validators.email
  ])
  age = new UntypedFormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ])
  password = new UntypedFormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])
  confirm_password = new UntypedFormControl('', [
    Validators.required,
  ])
  phoneNumber = new UntypedFormControl('',[
    Validators.required,
    Validators.minLength(14),
    Validators.maxLength(14)
  ])

  // instance of form group
  registerForm = new UntypedFormGroup({
    // arg1: helps angular to know what is inside this form
    // but its infer AbstractControl instead FormControl
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber
  })

  constructor(){
    // FormControl instead AbstractControl
    this.name
  }

  register(){
    this.showAlert = true
    this.alertMsg = 'Please wait! Your account is being created'
    this.alertColor = 'blue'
  }

}
