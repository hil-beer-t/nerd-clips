import { Component, OnInit } from '@angular/core';

// --- firebase ---
import { AngularFireAuth } from '@angular/fire/compat/auth'
// --- firebase ---
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    email: '',
    password: ''
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

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  async login() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! We are logging you in.';
    this.alertColor = this.blue;
    this.inSubmission = true;

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
    } catch (error) {
      console.error(error);
      this.inSubmission = false;
      this.alertMsg = 'An unexpected error has occurred. Please try again later.';
      this.alertColor = this.red;
      return;
    }

    this.alertMsg = 'Success! You are now logged in!';
    this.alertColor = this.green;
  }

}
