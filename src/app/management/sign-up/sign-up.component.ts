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

  userNameControl = new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(50)]);
  passwordControl = new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(14)]);
  displayNameControl = new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(25)]);

  constructor(public authService: AuthService) {
    this.isProgressVisible = false;

  }

  getUsernameErrorMessage() {
    if (this.userNameControl.hasError('required')) {
      return 'A mailaddress required.';
    }
    return this.userNameControl.hasError('formTitle') ? 'Not a valid mailaddress' : '';
  };

  getPasswordErrorMessage() {
    if (this.passwordControl.hasError('required')) {
      return 'Too short password.';
    }
    return this.passwordControl.hasError('formDescription') ? 'Not a valid password' : '';
  };

  getDisplayNameErrorMessage() {
    if (this.displayNameControl.hasError('required')) {
      return 'Needs to be between 3-25 characters';
    }
    return this.displayNameControl.hasError('formDescription') ? 'Not a valid display name' : '';
  };

  ShowProgressSpinner() {
    if (!this.authService.isLoggedIn) {
      this.isProgressVisible = true;
    } else {
      this.isProgressVisible = false;
    }
  };

  ngOnInit(): void {
  }

}
