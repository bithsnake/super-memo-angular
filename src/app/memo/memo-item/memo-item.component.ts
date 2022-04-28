import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Ingredient, ingredientsArray, IngredientType } from 'src/app/shared/ingredients';
import { MemoIcon, MemoIcons } from '../memo-icons/memo-icons';
import {IMemo} from '../../interfaces/interfaces'
import { Memo } from '../memo.model';
import * as uuid from 'uuid';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DocumentData, DocumentReference } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import firebase from 'firebase/compat/app';
import { FirebaseError } from '@angular/fire/app';
import {  Query, QueryDocumentSnapshot } from 'firebase/firestore';

import { collection, query, where, getDocs } from "firebase/firestore";
import { NewDialogComponent } from 'src/app/shared/new-dialog/new-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { QuestionComponent } from 'src/app/question/question.component';

let _id = uuid.v4();
const MAX_WIDTH = "20rem";


@Component({
  selector: 'app-memo-item',
  templateUrl: './memo-item.component.html',
  styleUrls: ['./memo-item.component.scss']
})

export class MemoItemComponent implements OnInit {
  // herer we are exposing this particular object to "the world"
  @Input() public memo: Memo;
  @Input() public currentActiveMemoIndex: number = -1;
  @Output() public memoDeleted: EventEmitter<Memo> = new EventEmitter();
  @Output() public onMemoClicked: EventEmitter<Memo> = new EventEmitter();
  @Output() public onUpdateMemo: EventEmitter<Memo> = new EventEmitter();
  @Output() public onResetCurrentMemoIndexOnAll: EventEmitter<Memo> = new EventEmitter();

  ngOnInit(): void {
  // document.querySelector('#__item')?.addEventListener('mousedown', this.RotateElement);
  // document.querySelector('#__item')?.addEventListener('mouseup', this.StopRotateElement);
  // document.querySelectorAll('#__item').forEach(x => x.setAttribute('id', `__item${20}`));
}


  public RotateElement(e : Event) {
    const _e = (e.currentTarget as HTMLDivElement);
    _e.classList.add('rotate-element');
    console.log("rotating element");
  }
  public StopRotateElement(e : Event) {
    const _e = (e.currentTarget as HTMLDivElement);
    _e.classList.remove('rotate-element');
    console.log("stop rotate element");
  }

  constructor(private authService : AuthService,private dialog: MatDialog) {
    this.memo = {
      Id: _id,
      Index : 0,
      Title: 'NoData',
      Description: 'Somet description!',
      CreatedDate : new Date().toLocaleDateString(),
      MemoIcon: "📝",
      AddIngredients: false,
      EditMemo: false,
      AddIngredient: () => { },
      ChangeIngredientAmount: () => { },
      DeleteIngredient: ()=>{},
      Ingredients: []
    }
  }
  // for this component
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


  public drop(event : CdkDragDrop<Ingredient[]>) {
    moveItemInArray(this.memo.Ingredients, event.previousIndex, event.currentIndex);
  }

  public async CheckCurrentMemoIndex() {
    this.onMemoClicked.emit(this.memo);
  }
  ToggleEditMemo(cancel : boolean) {
    this.memo.EditMemo = !this.memo.EditMemo;
    this.hasClicked = true;
    this.currentActiveMemoIndex = -1;
    if (cancel) {
      this.onUpdateMemo.emit()
      this.onResetCurrentMemoIndexOnAll.emit(this.memo);
    } else {
      if (this.memo.EditMemo === false) {
        this.UpdateIngredientsOnMemo();
        this.onResetCurrentMemoIndexOnAll.emit(this.memo);
        return;
      }
    }
    this.CheckCurrentMemoIndex();
  }
  async getDocs(q : Query<DocumentData>){
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    })
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
  }

  UpdateIngredientsOnMemo() {
    try {
      let mem = this.authService.afs.collection('users').doc(this.authService.userData.uid).collection('memos').doc(this.memo.Id);
      let sameLength: boolean = false;
      const isfound = mem.get().subscribe(data => {
        const memoOnDb = data.data() as Memo;
        if (memoOnDb.Ingredients.length === this.memo.Ingredients.length) {
          sameLength = true;
        }
        console.log(data);

        if (sameLength) {
          mem.set({
            Id: this.memo.Id,
            Index: this.memo.Index,
            Title: this.memo.Title,
            Description: this.memo.Description,
            CreatedDate : this.memo.CreatedDate,
            Ingredients : this.memo.Ingredients
          });
        } else {
          mem.set({
            Id: this.memo.Id,
            Index: this.memo.Index,
            Title: this.memo.Title,
            Description: this.memo.Description,
            CreatedDate : this.memo.CreatedDate,
            Ingredients : this.memo.Ingredients
          });
          // for (let i = 0; i < this.memo.Ingredients.length; i++) {
          //   const ingredient = this.memo.Ingredients[i];
          //   mem.update({
          //     Ingredients: firebase.firestore.FieldValue.arrayUnion({
          //       Name: ingredient.Name,
          //       Icon: ingredient.Icon,
          //       Amount: ingredient.Amount
          //     })
          //   }).catch(error => {
          //     const e = error as FirebaseError;
          //     console.log("error: ", e.message);
          //   })
          // }
        }
        isfound.closed = true;
      })


      if (isfound.closed) {
        this.onUpdateMemo.emit();
      }

    } catch (error) {
      let e = error as FirebaseError;
      // console.log("Error creating new memo: ", e.message);
      // const dialogConfig = new MatDialogConfig();
      // dialogConfig.data = {
      //   deleteItem: false,
      //   message : 'Are you sure you want to delete this memo item?',
      // }
      // const dialogRef = this.dialog.open(QuestionComponent, dialogConfig);
      new NewDialogComponent(this.dialog).OpenNewNotificationDialog('Something went wrong updating this memo item\n' + e.message);

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

  public ResetClick() {
  setTimeout(() => {
    this.hasClicked = false;
  }, 100);
  }

  public DeleteMemo() {
    this.memoDeleted.emit(this.memo);
  }
  // public UpdateInputText(e: Event) {
  //   // Telling angular that we know that this is an input element with explicit casting
  //   // works almost exactly like useRef() in React
  //   this.InputTextTest = (<HTMLInputElement>e.target).value
  // }
  public GetColor() {
    return this.IsDisabled ? 'red' : 'green';
  };

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
