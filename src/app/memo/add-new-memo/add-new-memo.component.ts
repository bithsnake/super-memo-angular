import { Component, Input, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IMemo } from 'src/app/interfaces/interfaces';
import { Ingredient,ingredientsArray , IngredientType} from 'src/app/shared/ingredients';
import { MemoIcon } from '../memo-icons/memo-icons';
import * as uuid from 'uuid';
import {FormControl, Validators} from '@angular/forms';
import { Memo } from '../memo.model';
import { MatDialogRef } from '@angular/material/dialog';
import { CdkDragDrop,moveItemInArray} from '@angular/cdk/drag-drop';

const _id = uuid.v4();
@Component({
  selector: 'app-add-new-memo',
  templateUrl: './add-new-memo.component.html',
  styleUrls: ['./add-new-memo.component.scss']
})
class AddNewMemoComponent implements IMemo {
  public Id: string = "";
  public Title: string = '';
  public Description: string = '';
  public CreatedDate: Date = new Date();
  public MemoIcon: MemoIcon ="📝";
  public Ingredients: Ingredient[] = []
  public max_width = "20rem";
  public clickedChildNodeIndex = 0;
  @Input() public memo: Memo;

  titleControl = new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(20)]);
  descriptionControl = new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(30)]);

  constructor(private dialogRef: MatDialogRef<AddNewMemoComponent>,@Inject(MAT_DIALOG_DATA) public data : Memo) {
    this.memo = new Memo(_id,this.Title,this.Description,new Date(),this.MemoIcon,this.Ingredients);
    data = this.memo;
  }
  /**Sends a reference of the new memo created to parent Component */
  public CreateNewMemo() {
    this.dialogRef.close(this.memo);
  }
  /**Removes 1 amount from an ingredient */
  RemoveIngredientFromList(addedIngredientIcon: IngredientType) {
    let currentIngredientList = this.memo.Ingredients;
    const _tempIngredient = currentIngredientList.find(x => x.Icon === addedIngredientIcon);
    if (_tempIngredient === undefined) return;
    _tempIngredient.Amount > 0 ? _tempIngredient.Amount - 1 : 0;
    if (_tempIngredient.Amount === 0) {
      const newList = currentIngredientList.filter(x => x.Icon !== addedIngredientIcon);
      currentIngredientList = newList;
      console.log("From 'add-new-memo' , Removed item: ", addedIngredientIcon);
    }

  }
  /**Adds an igredient to list if none is found, otherwise one is added to the current ingredient */
  AddIngredientToList(addedIngredientIcon: IngredientType) {
    // console.log("From 'add-new-memo' , Added item: ", addedIngredientIcon);
    const _tempIngredient = ingredientsArray.find(x => x.Icon === addedIngredientIcon);
    let newIngredient: Ingredient;

    if (_tempIngredient === undefined) return;

    newIngredient = new Ingredient(_tempIngredient.Name, _tempIngredient.Icon, 1);

    if (this.memo.Ingredients.length === 0) {
      this.memo.Ingredients.push(newIngredient);
      AnimateElementInChildNode(0);
      return;
    }
    const _foundIngredient = this.memo.Ingredients.find(x => x.Icon === newIngredient.Icon);
    const ingredientIndex = this.memo.Ingredients.findIndex(x => x.Icon === newIngredient.Icon);

    if (_foundIngredient !== undefined) {
      _foundIngredient.Amount += 1;
      AnimateElementInChildNode(ingredientIndex);
      return;
    } else if( _foundIngredient === undefined) {
      this.memo.Ingredients.push(newIngredient);
      const lastIndex = this.memo.Ingredients.length - 1;
      AnimateElementInChildNode(lastIndex);
      return;
    }
  }

  DecrementIngredient(chosenIngredientIcon: HTMLElement) {
    const icon = chosenIngredientIcon.innerText as IngredientType;
    if (icon === undefined || icon === null) return;
    let targetedIngredientInList = this.memo.Ingredients.find(x => x.Icon === icon);
    if (targetedIngredientInList === undefined) return;

    if (targetedIngredientInList.Amount > 1 ) {
      targetedIngredientInList.Amount--;

    } else {
      targetedIngredientInList.Amount--;
      let newIngredientList = this.memo.Ingredients.filter(removeIngredient => removeIngredient.Icon === icon);
      if (this.memo.Ingredients.length === 1 && newIngredientList[0].Amount <= 0) {
        this.memo.Ingredients = [];
        return;
      } else {
        const objectIndex = this.memo.Ingredients.indexOf(targetedIngredientInList, 0);
        this.memo.Ingredients.splice(objectIndex, 1);
        return;
      }
    }

  }
  getTitleErrorMessage() {
    if (this.titleControl.hasError('required')) {
      return 'Too short title';
    }

    return this.titleControl.hasError('formTitle') ? 'Not a valid title' : '';
  }
  getDescriptionErrorMessage() {
    if (this.descriptionControl.hasError('required')) {
      return 'Too short description';
    }

    return this.descriptionControl.hasError('formDescription') ? 'Not a valid description' : '';
  }
  getFoodListErrorMessage() {
    if (this.descriptionControl.hasError('required')) {
      return 'Too short description';
    }

    return this.descriptionControl.hasError('formDescription') ? 'Not a valid description' : '';
  }

  ExitMemo(e: Event) {
    e.preventDefault();
    this.dialogRef.close();
  }

  public drop(event : CdkDragDrop<Ingredient[]>) {
    moveItemInArray(this.memo.Ingredients, event.previousIndex, event.currentIndex);
  }
}




/**Animates a a chosen node with a specific class and resets it  */
export const AnimateElementInChildNode = (nodeIndex : number,parentNodeId : string = '_ingredientItems',  targetClassName : string = 'ingredient_item_', addClass : string = 'grow',resetAfterMs : number = 80) => {
  const item = document.getElementById(String(parentNodeId));
  if (item === undefined || item === null) return;
  document.querySelectorAll(`.${targetClassName}`)[nodeIndex].classList.add(String(addClass));

  setTimeout(() => {
  document.querySelectorAll(`.${targetClassName}`)[nodeIndex].classList.remove(String(addClass));
  }, resetAfterMs);
}

export default AddNewMemoComponent;
