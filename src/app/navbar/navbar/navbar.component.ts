import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  id: string;

  ClickHandler = (e?: Event, action: string = 'home') => {
    switch (action) {
      case 'home':
        // if not logged in, redirect to the sign-in page
        if (!this.authService.isLoggedIn)
        {
          this.router.navigate(['sign-in']); return;
        }
        e?.preventDefault();
        this.router.navigate(['app']);
        break;
      case 'userprofile':
        e?.preventDefault();
        this.router.navigate(['dashboard']);
        break;
      case 'app':
        e?.preventDefault();
        this.router.navigate(['app']);

        break;
      case 'about':
        e?.preventDefault();
        this.router.navigate(['about']);
        break;
      case 'logout':
        e?.preventDefault();
        this.authService.SignOut();
        break;
      default: 'home'
        e?.preventDefault();
        this.router.navigate(['app']);
        break;
    }
    if (e === null || e === undefined) return;
    e.preventDefault();
  };
  constructor( public authService : AuthService, public router : Router,) {
    this.id = "";
  }
}
