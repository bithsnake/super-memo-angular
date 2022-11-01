import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ingredient, IngredientType, ingredientsArray } from 'src/app/shared/ingredients';
import { IngredientsModalComponent } from 'src/app/shared/ingredients-modal/ingredients-modal.component';
import { MemoServices } from 'src/app/shared/services/memo.service';
import { Memo } from '../../memo.model';
import { AddIngredientToList } from '../../../shared/services/memo.service'

@Component({
  selector: 'app-memo-item-edit-modal',
  templateUrl: './memo-item-edit-modal.component.html',
  styleUrls: ['./memo-item-edit-modal.component.scss']
})
export class MemoItemEditModalComponent implements OnInit {

  public memo!: Memo;
  public currentActiveMemoIndex : number = -1;

  constructor(public dialog : MatDialog, private dialogRef: MatDialogRef<MemoItemEditModalComponent>,@Inject(MAT_DIALOG_DATA) public data: Memo, private memoService : MemoServices) { }


  ngOnInit() {
    this.memo = this.data as Memo;
    }


  public AddNewIngredientsDialogue() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      Ingredients: ([] = [...this.memo.Ingredients]),
    };

    const dialogRef = this.dialog.open(IngredientsModalComponent, dialogConfig);


    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data === null || data === undefined) return;
        this.memo.Ingredients = [];
        this.memo.Ingredients = data as Ingredient[];
        // UpdateIngredientsOnMemo(this.memo.Title,this.memo.Description, this.memo.CreatedDate.toLocaleDateString(), this.memo, this.memoService);

      },
      error: (error) => console.log(error),
      complete: () => console.log('completed adding new ingredients'),
    });
  }

  public AddedIngredientsToCurrentMemo(IngredientsData: Ingredient[]) {
    if (IngredientsData.length <= 0) return;
  }
  /**Adds an igredient to list if none is found, otherwise one is added to the current ingredient */

  public AddIngredient() {
  }
}
