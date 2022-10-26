import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ingredient, IngredientType, ingredientsArray } from 'src/app/shared/ingredients';
import { IngredientsModalComponent } from 'src/app/shared/ingredients-modal/ingredients-modal.component';
import { MemoServices } from 'src/app/shared/services/memo.service';
import { Memo } from '../../memo.model';

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
  public AddIngredientToList(addedIngredientIcon: IngredientType) {
    // console.log("From 'add-new-memo' , Added item: ", addedIngredientIcon);
    const _tempIngredient = ingredientsArray.find(
      (x) => x.Icon === addedIngredientIcon
    );
    let newIngredient: Ingredient;

    if (_tempIngredient === undefined) return;
    newIngredient = new Ingredient(
      _tempIngredient.Name,
      _tempIngredient.Icon,
      1
    );

    if (this.memo.Ingredients.length === 0) {
      this.memo.Ingredients.push(newIngredient);
      this.AnimateElementInChildNode(0);
      return;
    }
    const _foundIngredient = this.memo.Ingredients.find(
      (x) => x.Icon === newIngredient.Icon
    );
    const ingredientIndex = this.memo.Ingredients.findIndex(
      (x) => x.Icon === newIngredient.Icon
    );

    if (_foundIngredient !== undefined) {
      _foundIngredient.Amount += 1;

      this.AnimateElementInChildNode(ingredientIndex);
      return;
    } else if (_foundIngredient === undefined) {
      this.memo.Ingredients.push(newIngredient);
      const lastIndex = this.memo.Ingredients.length - 1;
      this.AnimateElementInChildNode(lastIndex);
      return;
    }
  }

    /**Animates a a chosen node with a specific class and resets it  */
    public AnimateElementInChildNode = (
      nodeIndex: number,
      parentNodeId: string = '_ingredientItem',
      targetClassName: string = 'ingredient_item_',
      addClass: string = 'grow',
      resetAfterMs: number = 80
    ) => {
      const item = document.getElementsByClassName('_memo_lists');
      if (
        item === undefined ||
        item === null ||
        this.currentActiveMemoIndex === -1
      )
        return;
      document
        .querySelectorAll(`.${'_memo_lists'}`)
        [this.currentActiveMemoIndex].querySelectorAll(`.${targetClassName}`)
        [nodeIndex].classList.add(String(addClass));
      setTimeout(() => {
        document
          .querySelectorAll(`.${'_memo_lists'}`)
          [this.currentActiveMemoIndex].querySelectorAll(`.${targetClassName}`)
          [nodeIndex].classList.remove(String(addClass));
      }, resetAfterMs);
    };
}
