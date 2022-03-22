import { Component, OnInit } from '@angular/core';
import { ingredientsArray } from '../ingredients';

@Component({
  selector: 'app-ingredients-modal',
  templateUrl: './ingredients-modal.component.html',
  styleUrls: ['./ingredients-modal.component.scss']
})


export class IngredientsModalComponent implements OnInit {
  public _ingredients = ingredientsArray;
  constructor() { }

  ngOnInit() {
    console.log("IngredientsModalComponent initiated");
  }
}
