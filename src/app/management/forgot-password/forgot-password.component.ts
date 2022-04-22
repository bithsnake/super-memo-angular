import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  userNameControl = new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(20)]);
  passwordControl = new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(30)]);

  constructor(public authService : AuthService) { }

  getUsernameErrorMessage() {
    if (this.userNameControl.hasError('required')) {
      return 'Too short title';
    }
    return this.userNameControl.hasError('formTitle') ? 'Not a valid title' : '';
  }
  getPasswordErrorMessage() {
    if (this.passwordControl.hasError('required')) {
      return 'Too short description';
    }
    return this.passwordControl.hasError('formDescription') ? 'Not a valid description' : '';
  }


  ngOnInit(): void {
  }

}
