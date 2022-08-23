import { RegisterValidators } from './../validators/register-validator';
import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { EmailTaken } from '../validators/email-taken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  constructor(
    private authService: AuthService,
    private emailTaken: EmailTaken){
    // FormControl instead AbstractControl
    this.name
  }

  // colors
  red = 'rgb(248 113 113)'
  green = 'rgb(74 222 128)'
  blue = 'rgb(34 211 238)'

  // deny button while submitting
  inSubmission = false

  // --- alert properties ---
  showAlert = false
  alertMsg = 'Please wait! Your account is being created'
  alertColor = this.blue
  // --- alert properties ---



  // force FormControl type
  name = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email = new UntypedFormControl('', [
    Validators.required,
    Validators.email,

  ], [this.emailTaken.validate])
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
  }, [RegisterValidators.match('password', 'confirm_password')])

  async register(){
    this.showAlert = true
    this.alertMsg = 'Please wait! Your account is being created'
    this.alertColor = this.blue
    this.inSubmission = true


    try {

      this.authService.createUser(this.registerForm.value)

    } catch(e) {
      console.log(e)

      this.alertMsg = 'An unexpected error occurred. Please try again later.'
      this.alertColor = this.red
      this.inSubmission = false

      return
    }

    this.alertMsg = 'Success! Your account has been created.'
    this.alertColor = this.green
  }

}
