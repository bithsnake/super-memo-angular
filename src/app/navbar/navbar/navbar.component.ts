import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  id: string;

  ClickHandler = (e?: Event) => {
    if (e === null || e === undefined) return;
    e.preventDefault();
    console.log("this something: ", e.target);
  };
  constructor() {
    this.id = "";
  }

  ngOnInit(): void {
  }

}
