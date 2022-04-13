import { Component, Inject, Input, OnInit } from '@angular/core';
import { IMemo } from 'src/app/interfaces/interfaces';
import { Ingredient, ingredients, IngredientType} from 'src/app/shared/ingredients';
import { MemoIcon, MemoIcons } from '../memo-icons/memo-icons';
import * as uuid from 'uuid';
import {FormControl, Validators} from '@angular/forms';
import { Memo } from '../memo.model';

/*
    Check out this component
    app-ingredients-modal
    And make a Output emitter where we emit the ingredients being clicked ont o add them to the current memo list!
 */
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
  @Input() public memo: Memo;

  titleControl = new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(20)]);
  descriptionControl = new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(30)]);

  constructor() {
    this.memo = new Memo(_id,'New Memo','NewTitle',new Date(),this.MemoIcon,this.Ingredients);
  }

  AddIngredientToList(icon: HTMLParagraphElement, name: HTMLParagraphElement) {

    const _newIngredinet: Ingredient = { Icon: icon.innerHTML as IngredientType, Name: name.innerHTML, Amount : 1 };
    this.memo.AddIngredient(_newIngredinet);
  }
  OnFirstRun() {
    console.log("Created a new Memo!")
  };
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

}

export default AddNewMemoComponent;
