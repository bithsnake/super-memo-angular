import { Component, Input, OnInit } from '@angular/core';
import { Ingredient, ingredientsArray, IngredientType } from 'src/app/shared/ingredients';
import {  MemoIcons } from '../memo-icons/memo-icons';
import { Memo } from '../memo.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DocumentData } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import {  Query } from 'firebase/firestore';

import { getDocs } from "firebase/firestore";
import { NewDialogComponent } from 'src/app/shared/new-dialog/new-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IngredientsModalComponent } from 'src/app/shared/ingredients-modal/ingredients-modal.component';
import { MemoAsMailComponent } from 'src/app/memo-as-mail/memo-as-mail.component';
import { MemoServices } from 'src/app/shared/services/memo.service';
const MAX_WIDTH = "20rem";
@Component({
  selector: 'app-memo-item',
  templateUrl: './memo-item.component.html',
  styleUrls: ['./memo-item.component.scss']
})

export class MemoItemComponent implements OnInit {

  @Input() public memo!: Memo;
  @Input() public currentActiveMemoIndex: number = -1;
  public dateText!: string;
  public max_width = MAX_WIDTH;
  public height = 0;
  public Id: number = -1;
  public _ingredients = ingredientsArray;
  public AddIngredients: boolean = false;
  public EditMemo: boolean = false;
  public DeleteIngredient: boolean = false;
  public Icons = MemoIcons;
  public TextTest = '';
  public InputTextTest = '';
  public IsDisabled: boolean = false;
  public hasClicked: boolean = false;
  public canshowAfterOpacityIsZero: boolean = false;

  // @Output() public memoDeleted: EventEmitter<Memo> = new EventEmitter();
  // @Output() public sendMemoAsMail: EventEmitter<Memo> = new EventEmitter();
  // @Output() public onMemoClicked: EventEmitter<Memo> = new EventEmitter();
  // @Output() public onUpdateMemo: EventEmitter<Memo> = new EventEmitter();
  // @Output() public onResetCurrentMemoIndexOnAll: EventEmitter<Memo> = new EventEmitter();

  ngOnInit(): void {
  // document.querySelector('#__item')?.addEventListener('mousedown', this.RotateElement);
  // document.querySelector('#__item')?.addEventListener('mouseup', this.StopRotateElement);
  // document.querySelectorAll('#__item').forEach(x => x.setAttribute('id', `__item${20}`));


    const dateText = this.memo.CreatedDate as unknown as {seconds : number, nanoseconds : number };
    console.log("dateText: ", dateText);
    this.dateText = String(this.memo.CreatedDate);
    console.log("this.dateText: ", this.dateText);
    document.getElementsByClassName('hide-item').item(0)?.classList.replace('hide-item', 'show-item');

}

  // private RotateElement(e : Event) {
  //   const _e = (e.currentTarget as HTMLDivElement);
  //   _e.classList.add('rotate-element');
  // }
  // private StopRotateElement(e : Event) {
  //   const _e = (e.currentTarget as HTMLDivElement);
  //   _e.classList.remove('rotate-element');
  // }


  constructor(private authService: AuthService, private dialog: MatDialog, public memoService: MemoServices) {

  }

  public drop(event: CdkDragDrop<Ingredient[]>) {
    moveItemInArray(this.memo.Ingredients, event.previousIndex, event.currentIndex);
    this.UpdateIngredientsOnMemo();
  }

  public async CheckCurrentMemoIndex() {
    this.memoService.onMemoClicked.emit(this.memo);
  };

  ToggleEditMemo(cancel : boolean) {
    this.memo.EditMemo = !this.memo.EditMemo;
    this.hasClicked = true;
    this.currentActiveMemoIndex = -1;

    if (cancel) {
<<<<<<< HEAD
      this.memoService.onUpdateMemo$.next(this.memo);
=======
      this.memoService.onUpdateMemo.next(this.memo);
>>>>>>> 2e8d54683d2209dcc11ffa4d9e8365caebb3c0bd
      this.memoService.onResetCurrentMemoIndexOnAll.emit(this.memo);
    } else {
      if (this.memo.EditMemo === false) {
        this.UpdateIngredientsOnMemo();
        this.memoService.onResetCurrentMemoIndexOnAll.emit(this.memo);
        return;
      } else {

      }
    }
    this.CheckCurrentMemoIndex();
  };

  private async getDocs(q : Query<DocumentData>){
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    })
  };

  public AddNewIngredientsDialogue() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      Ingredients : [] = [...this.memo.Ingredients] ,
    }

    const dialogRef = this.dialog.open(IngredientsModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      {
      next : (data) =>  {
        if (data === null || data === undefined) return;
        this.memo.Ingredients = [];
        this.memo.Ingredients = data as Ingredient[];
        this.UpdateIngredientsOnMemo();
      },
      error: (error => console.log(error)),
      complete: ()=> console.log("completed adding new ingredients")
    }
    );
  };

  AddedIngredientsToCurrentMemo(IngredientsData: Ingredient[]) {
    if (IngredientsData.length <= 0) return;


  }
  /**Adds an igredient to list if none is found, otherwise one is added to the current ingredient */
  AddIngredientToList(addedIngredientIcon: IngredientType) {
      // console.log("From 'add-new-memo' , Added item: ", addedIngredientIcon);
      const _tempIngredient = ingredientsArray.find(x => x.Icon === addedIngredientIcon);
      let newIngredient: Ingredient;

      if(_tempIngredient === undefined) return;
      newIngredient = new Ingredient(_tempIngredient.Name, _tempIngredient.Icon, 1);

      if (this.memo.Ingredients.length === 0) {
        this.memo.Ingredients.push(newIngredient);
        this.AnimateElementInChildNode(0);
        return;
      }
      const _foundIngredient = this.memo.Ingredients.find(x => x.Icon === newIngredient.Icon);
      const ingredientIndex = this.memo.Ingredients.findIndex(x => x.Icon === newIngredient.Icon);

      if (_foundIngredient !== undefined) {
        _foundIngredient.Amount += 1;

        this.AnimateElementInChildNode(ingredientIndex);
        return;
      } else if( _foundIngredient === undefined) {
        this.memo.Ingredients.push(newIngredient);
        const lastIndex = this.memo.Ingredients.length - 1;
        this.AnimateElementInChildNode(lastIndex);
        return;
      }
  };

  UpdateIngredientsOnMemo() {
    this.dateText = this.memoService.UpgradeCurrentMemoIngredients(this.memo);
  };

  /*Decrement Ingredient from current memo list */
  DecrementIngredient(chosenIngredientIcon: HTMLElement) {
    const icon = chosenIngredientIcon.innerText as IngredientType;

    if (icon === undefined || icon === null) return;

    let targetedIngredientInList = this.memo.Ingredients.find(x => x.Icon === icon);

    if (targetedIngredientInList === undefined) return;

    // if amount is over 1 then decrement
    if (targetedIngredientInList.Amount > 1 ) {
      targetedIngredientInList.Amount--;

    } else { // else remove the whole item
      targetedIngredientInList.Amount--;
      let newIngredientList = this.memo.Ingredients.filter(removeIngredient => removeIngredient.Icon === icon);
      if (this.memo.Ingredients.length === 1 && newIngredientList[0].Amount <= 0) {
        this.memo.Ingredients = [];
        this.DeleteMemo();
        return;
      } else {
        const objectIndex = this.memo.Ingredients.indexOf(targetedIngredientInList, 0);
        this.memo.Ingredients.splice(objectIndex, 1);

        if (this.memo.Ingredients.length <= 0) {
        }
        return;
      }
    }
  };

  public ResetClick() {
  setTimeout(() => {
    this.hasClicked = false;
  }, 100);
  };

  /*Delete memo */
  public DeleteMemo() {
    this.memoService.OpenDeleteMemoDialog(this.memo);
  };

  /*Send memo as mail */
  public SendAsMailDialog() {
    console.log("opening mail form memo sent as mail!");

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message : "" as string,
      memo : this.memo as Memo,
    }

    const dialogRef = this.dialog.open(MemoAsMailComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((emailData) => {
      new NewDialogComponent(this.dialog).OpenNewNotificationDialog('Your memo was sent to : ' + emailData);
    });

  };
  /*Set different color if disabled */
  public GetColor() {
    return this.IsDisabled ? 'red' : 'green';
  };

    /**Animates a a chosen node with a specific class and resets it  */
  AnimateElementInChildNode = (nodeIndex: number, parentNodeId: string = '_ingredientItem', targetClassName: string = 'ingredient_item_', addClass: string = 'grow', resetAfterMs: number = 80) => {
    const item = document.getElementsByClassName('_memo_lists');
    if (item === undefined || item === null || this.currentActiveMemoIndex === -1) return;
    document.querySelectorAll(`.${'_memo_lists'}`)[this.currentActiveMemoIndex].querySelectorAll(`.${targetClassName}`)[nodeIndex].classList.add(String(addClass));
    setTimeout(() => {
      document.querySelectorAll(`.${'_memo_lists'}`)[this.currentActiveMemoIndex].querySelectorAll(`.${targetClassName}`)[nodeIndex].classList.remove(String(addClass));
    }, resetAfterMs);
  };
};
