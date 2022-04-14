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
  public Title: string = '';
  public Description: string = '';
  public CreatedDate: Date = new Date();
  public MemoIcon: MemoIcon = MemoIcons.memo.icon;
  public newIngredients: Ingredient[] = [];
  @Output() public AddedIngredientIcon: IngredientType = '🍆';
  /*
    public Id: string,
    public Title: string,
    public Description: string,
    public CreatedDate : Date = new Date(),
    public MemoIcon: MemoIcon,
    public Ingredients: Ingredient[] = [],
  */
  public NewMemo: Memo = new Memo(uuid.v4(), this.Title = '', this.Description = '', this.CreatedDate, this.MemoIcon, this.newIngredients = []);
  constructor() { }

  // RemoveIngredientFromList(e: any) {
  //   const _removedIngredientIcon = (e as HTMLElement).textContent as IngredientType;
  //   const _ingredient = this.newIngredients.find(x => x.Icon === _removedIngredientIcon);
  //   this.IngredientRemoved.emit(_removedIngredientIcon);
  //   // if (_ingredient === undefined) return;
  //   // _ingredient.Amount > 0 ? _ingredient.Amount - 1 : 0;
  //   // if (_ingredient.Amount === 0) {
  //   //   const newList = this.newIngredients.filter(x => x.Icon !== _removedIngredientIcon);
  //   //   this.newIngredients = newList;
  //   // }
  //   // this.IngredientRemoved.emit(_removedIngredientIcon);
  // }
  AddIngredientToList(e : any) {
    const _addedIngredientIcon = (e as HTMLElement).textContent as IngredientType;
    this.AddedIngredientIcon = _addedIngredientIcon;
    console.log("New Ingredient Added: " , this.AddedIngredientIcon);
    this.NewIngredientsAdded.emit(this.AddedIngredientIcon);
  }

  // CreateNewMemo(titleInput: HTMLInputElement, descriptionInput: HTMLInputElement) {
  //   this.NewMemo.Title = titleInput.value.toString().trim()
  //   this.NewMemo.Description = descriptionInput.value.toString().trim();
  //   this.NewMemo.CreatedDate = new Date();
  //   this.NewMemo.Ingredients = this.newIngredients;
  //   const _ingredients = this.newIngredients;
  //   this.NewMemoAdded.emit(this.NewMemo);
  // }

  ngOnInit() {
    console.log("IngredientsModalComponent initiated, current new memo: " , this.NewMemo);
  }
}
