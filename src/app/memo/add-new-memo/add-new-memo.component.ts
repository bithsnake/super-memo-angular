import { Component, Inject, OnInit } from '@angular/core';
import { IMemo } from 'src/app/interfaces/interfaces';
import { Ingredient } from 'src/app/shared/ingredients';
import { MemoIcon } from '../memo-icons/memo-icons';
import { Memo } from '../memo.model';
import * as uuid from 'uuid';
import {FormControl, Validators} from '@angular/forms';

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
  public Ingredients: Ingredient[] = [];

  titleControl = new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(20)]);
  descriptionControl = new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(20)]);


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
