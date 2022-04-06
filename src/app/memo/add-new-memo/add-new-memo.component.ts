import { Component, Inject, OnInit } from '@angular/core';
import { IMemo } from 'src/app/interfaces/interfaces';
import { Ingredient } from 'src/app/shared/ingredients';
import { MemoIcon } from '../memo-icons/memo-icons';
import { Memo } from '../memo.model';
import * as uuid from 'uuid';


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

  OnFirstRun() {
    console.log("Created a new Memo!")
  };


}

export default AddNewMemoComponent;
