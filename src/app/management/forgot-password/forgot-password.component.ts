import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {


  emailAddressControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]);
  constructor(public authService : AuthService) { }

  getUsernameErrorMessage() {
    if (this.emailAddressControl.hasError('required')) {
      return 'Not an email address';
    }
    return this.emailAddressControl.hasError('formTitle') ? 'Not a valid mailaddress' : '';
  }
}
