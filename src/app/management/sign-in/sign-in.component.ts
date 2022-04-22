import { Component, OnInit} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import {CdkPortalOutletAttachedRef, Portal, PortalModule} from '@angular/cdk/portal';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit  {

  // original state is empty string
  userNameControl = new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(20)]);
  passwordControl = new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(30)]);
  constructor(public authService: AuthService) {

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

  ngOnInit(): void {
  }
}
