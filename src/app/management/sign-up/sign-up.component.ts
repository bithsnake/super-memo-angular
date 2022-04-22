import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isProgressVisible: boolean;

  userNameControl = new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(20)]);
  passwordControl = new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(30)]);

  constructor(public authService: AuthService) {
    this.isProgressVisible = false;

  }

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

  ShowProgressSpinner() {
    if (!this.authService.isLoggedIn) {
      this.isProgressVisible = true;
    } else {
      this.isProgressVisible = false;
    }
  }
  ngOnInit(): void {
  }

}
