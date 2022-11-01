import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Memo } from 'src/app/memo/memo.model';
import { Ingredient, ingredientsArray, IngredientType } from '.././shared/ingredients';
import * as uuid from 'uuid';
import { MemoIcon, MemoIcons } from 'src/app/memo/memo-icons/memo-icons';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-create-new-ingredients-modal',
  templateUrl: './create-new-ingredients-modal.component.html',
  styleUrls: ['./create-new-ingredients-modal.component.scss']
})
export class CreateNewIngredientsModalComponent implements OnInit {
  @Output() public NewMemoAdded: EventEmitter<Memo> = new EventEmitter;
  @Output() public NewIngredientsAdded: EventEmitter<IngredientType> = new EventEmitter;
  @Output() public IngredientRemoved: EventEmitter<IngredientType> = new EventEmitter;


  public _ingredients = ingredientsArray;
  public Index: string = '-1';
  public Title: string = '';
  public Description: string = '';
  public CreatedDate: Date = new Date();
  public MemoIcon: MemoIcon = MemoIcons.memo.icon;
  public newIngredients: Ingredient[] = [];
  public currentIngredients: Ingredient[] = [];
  public currentIngredientsBuffer: Ingredient[] = [];
  public currentIngredientsLength: number = -1;
  public item: any;
  public showTitle: boolean = false;
  @Input() public currentActiveMemoIndex: number = -1;
  @Output() public AddedIngredientIcon: IngredientType = '🍆';

  public NewMemo: Memo = new Memo(uuid.v4(),this.Index = '-1', this.Title = '', this.Description = '', this.CreatedDate, this.MemoIcon, this.newIngredients = []);

  constructor() {
    // this.currentIngredients = data.length <= 0 ? [] : data.Ingredients;
    // this.currentIngredientsBuffer = data.length <= 0 ? [] : data.Ingredients;
    // this.currentIngredientsLength = Array(this.currentIngredients).length;
    console.log("currentIngredients: ", this.currentIngredients);
  }

  SetText(element: HTMLAnchorElement, ingredientName: string) {
  }

  AddIngredientToList(e: any) {
    console.log("current ingredients: ", this.currentIngredients);
    const _addedIngredientIcon = (e as HTMLElement).textContent?.trim().replace(' ','') as IngredientType;
    this.AddedIngredientIcon = _addedIngredientIcon;
    this.NewIngredientsAdded.emit(this.AddedIngredientIcon);

    if (this.currentIngredients.length > 0) {
      // console.log("From 'add-new-memo' , Added item: ", addedIngredientIcon);
      const _tempIngredient = ingredientsArray.find(x => x.Icon === this.AddedIngredientIcon);
      let newIngredient: Ingredient;

      if(_tempIngredient === undefined) return;
      newIngredient = new Ingredient(_tempIngredient.Name, _tempIngredient.Icon, 1);

      if (this.currentIngredients.length === 0) {
        this.currentIngredients.push(newIngredient);
        this.AnimateElementInChildNode(0);
        return;
      }
      const _foundIngredient = this.currentIngredients.find(x => x.Icon === newIngredient.Icon);
      const ingredientIndex = this.currentIngredients.findIndex(x => x.Icon === newIngredient.Icon);

      if (_foundIngredient !== undefined) {
        _foundIngredient.Amount += 1;

        this.AnimateElementInChildNode(ingredientIndex);
        return;
      } else if( _foundIngredient === undefined) {
        this.currentIngredients.push(newIngredient);
        const lastIndex = this.currentIngredients.length - 1;
        this.AnimateElementInChildNode(lastIndex);
        return;
      }
    }
  }

  ngOnInit() {
    document.querySelector('#__item')?.classList.add('z-index-1000');
    // console.log("data: ", this.data);
    // for (let i = 0; i < this.data.Ingredients.length; i++) {
    //   const element = this.data.Ingredients[i];
    //   this.currentIngredients.push(element);

    // }
    // console.log("current ingredients: ", this.currentIngredients);
    // console.log("current ingredients: ", this.currentIngredients);

  }

  Cancel() {
    this.currentIngredients = this.currentIngredientsBuffer;
    // this.dialogRef.close([]);
  }

  DecrementIngredient(chosenIngredientIcon: HTMLElement) {
    const icon = chosenIngredientIcon.innerText as IngredientType;
    if (icon === undefined || icon === null) return;
    let targetedIngredientInList = this.currentIngredients.find(x => x.Icon === icon);
    if (targetedIngredientInList === undefined) return;

    if (targetedIngredientInList.Amount > 1 ) {
      targetedIngredientInList.Amount--;

    } else {
      targetedIngredientInList.Amount--;
      let newIngredientList = this.currentIngredients.filter(removeIngredient => removeIngredient.Icon === icon);
      if (this.currentIngredients.length === 1 && newIngredientList[0].Amount <= 0) {
        this.currentIngredients = [];
        return;
      } else {
        const objectIndex = this.currentIngredients.indexOf(targetedIngredientInList, 0);
        this.currentIngredients.splice(objectIndex, 1);
        return;
      }
    }
  }

  UpdateAndClose() {
    // this.dialogRef.close(this.currentIngredients);
  }

      /**Animates a a chosen node with a specific class and resets it  */
      AnimateElementInChildNode = (nodeIndex : number,parentNodeId : string = '_ingredientItem',  targetClassName : string = 'ingredient_item_', addClass : string = 'grow',resetAfterMs : number = 80) => {
        const item = document.getElementsByClassName('_memo_lists');

        if (item === undefined || item === null || this.currentActiveMemoIndex === -1) return;
        document.querySelectorAll(`.${'_memo_lists'}`)[this.currentActiveMemoIndex].querySelectorAll(`.${targetClassName}`)[nodeIndex].classList.add(String(addClass));
        setTimeout(() => {
          document.querySelectorAll(`.${'_memo_lists'}`)[this.currentActiveMemoIndex].querySelectorAll(`.${targetClassName}`)[nodeIndex].classList.remove(String(addClass));
        }, resetAfterMs);
    }

}
