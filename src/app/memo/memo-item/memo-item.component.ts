import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients';
import { MemoIcon } from '../memo-icons/memo-icons';
type NewType = MemoIcon;

@Component({
  selector: 'app-memo-item',
  templateUrl: './memo-item.component.html',
  styleUrls: ['./memo-item.component.scss']
})

export class MemoItemComponent implements OnInit {

  Title: string;
  Description: string;
  IngredientsList: Ingredient[];
  MemoIcon : NewType;

  constructor() {
    this.Title = "New Memo!";
    this.Description = "New description or memo!";
    this.IngredientsList = [];
    this.MemoIcon = "📝";
  }
  ngOnInit(): void {
  }
}
