import { createViewChild } from '@angular/compiler/src/core';
import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, AfterViewInit  {

  // original state is empty string

  userNameControl = new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(100)]);
  passwordControl = new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(100)]);
  constructor(public authService: AuthService) {

  }
  getUsernameErrorMessage() {
    if (this.userNameControl.hasError('required')) {
      return 'A mailaddress required.';
    }
    return this.userNameControl.hasError('formTitle') ? 'Not a valid mailaddress' : '';
  }
  getPasswordErrorMessage() {
    if (this.passwordControl.hasError('required')) {
      return 'Too short password.';
    }
    return this.passwordControl.hasError('formDescription') ? 'Not a valid password' : '';
  }

  FormIsValid() {
    return this.userNameControl.valid === true && this.passwordControl.valid === true;
  }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    // child is set
  }
}
