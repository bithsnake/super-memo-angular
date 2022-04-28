import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Memo } from 'src/app/memo/memo.model';
import { Ingredient, ingredientsArray, IngredientType } from '../ingredients';
import * as uuid from 'uuid';
import { MemoIcon, MemoIcons } from 'src/app/memo/memo-icons/memo-icons';
import { DatePipe } from '@angular/common';
let _id = uuid.v4();
@Component({
  selector: 'app-ingredients-modal',
  templateUrl: './ingredients-modal.component.html',
  styleUrls: ['./ingredients-modal.component.scss']
})

export class IngredientsModalComponent implements OnInit {

  @Output() public NewMemoAdded: EventEmitter<Memo> = new EventEmitter;
  @Output() public NewIngredientsAdded: EventEmitter<IngredientType> = new EventEmitter;
  @Output() public IngredientRemoved: EventEmitter<IngredientType> = new EventEmitter;

  public _ingredients = ingredientsArray;
  public Index: number = -1;
  public Title: string = '';
  public Description: string = '';
  public CreatedDate: string = new Date().toLocaleDateString();
  public MemoIcon: MemoIcon = MemoIcons.memo.icon;
  public newIngredients: Ingredient[] = [];
  @Output() public AddedIngredientIcon: IngredientType = '🍆';

  public NewMemo: Memo = new Memo(uuid.v4(),this.Index = -1, this.Title = '', this.Description = '', this.CreatedDate, this.MemoIcon, this.newIngredients = []);
  constructor() { }

  AddIngredientToList(e : any) {
    const _addedIngredientIcon = (e as HTMLElement).textContent?.trim().replace(' ','') as IngredientType;
    this.AddedIngredientIcon = _addedIngredientIcon;
    console.log("New Ingredient Added: " , this.AddedIngredientIcon);
    this.NewIngredientsAdded.emit(this.AddedIngredientIcon);
  }

  ngOnInit() {
    console.log("IngredientsModalComponent initiated, current new memo: " , this.NewMemo);
  }
}
