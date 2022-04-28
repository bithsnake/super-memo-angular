import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  @Injectable()
export class AppComponent implements OnInit {

constructor(public authService: AuthService) {
}
  ngOnInit(): void {}
};
