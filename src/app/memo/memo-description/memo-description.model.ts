import { Component, Host, OnInit } from '@angular/core';
import { Food } from 'src/app/food/food';

@Component({
  selector: 'app-memo-description',
  templateUrl: './memo-description.component.html',
  styleUrls: ['./memo-description.component.scss']
})

export class MemoDescriptionComponent implements OnInit {

  constructor() {
    this.Name = "New memo name!";
    this.Description = "Feed me a description!";
    this.FoodList = [];
  }
  public Name: string = "New food memo!";
  public Description : string  = "Give me a description!";
  public FoodList: Food[] = [];


  ngOnInit(): void {
    this.Name = "New food memo!";
    this.Description = "New food memo!";
    this.FoodList = [];
  }

}
