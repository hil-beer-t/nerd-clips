import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// ---- forms ----
import { ReactiveFormsModule } from '@angular/forms';
// ---- forms ----

@NgModule({
  declarations: [
    AuthModalComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthModalComponent
  ]
})
export class UserModule { }
