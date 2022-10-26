import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
const MAX_WIDTH = "20rem";
@Component({
  selector: 'app-memo-item',
  templateUrl: './memo-item.component.html',
  styleUrls: ['./memo-item.component.scss'],
})
export class MemoItemComponent implements OnInit,AfterViewInit {
  @Input() public memo!: Memo;
  @Input() public currentActiveMemoIndex: number = -1;
  @Input() public myMemoIndex: number = -1;
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
  public showMemo: boolean = false;
  ngOnInit(): void {
    // document.querySelector('#__item')?.addEventListener('mousedown', this.RotateElement);
    // document.querySelector('#__item')?.addEventListener('mouseup', this.StopRotateElement);
    // document.querySelectorAll('#__item').forEach(x => x.setAttribute('id', `__item${20}`));

    const dateText = this.memo.CreatedDate as unknown as {
      seconds: number;
      nanoseconds: number;
    };

    // console.log('dateText: ', dateText);
    this.dateText = String(this.memo.CreatedDate);
    // console.log('this.dateText: ', this.dateText);
    document
      .getElementsByClassName('hide-item')
      .item(0)
      ?.classList.replace('hide-item', 'show-item');

    this.route.params.subscribe((params: Params) => {
      const num = params['id'];
        // this.memo.Index = Number(num);
    });
  }

  // private RotateElement(e : Event) {
  //   const _e = (e.currentTarget as HTMLDivElement);
  //   _e.classList.add('rotate-element');
  // }
  // private StopRotateElement(e : Event) {
  //   const _e = (e.currentTarget as HTMLDivElement);
  //   _e.classList.remove('rotate-element');
  // }

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    public memoService: MemoServices,
    public router: Router,
    private route: ActivatedRoute
  ) {}
  ngAfterViewInit(): void {
    let element = document.getElementById('__item');
    if (element) {
      element.id += String(this.myMemoIndex);
    }
  }

  public GoToItem(memoId: number) {
    this.showMemo = true;
    console.log("this.router snapshot: " + this.route.snapshot);
    console.log("this.router data: " + this.route.data);
    console.log("this.router params: " + this.route.params);
    console.log("this.router params: " + this.route.params);
    // this.routerLink.queryParams = ['/items', this.memo.Index];
    // this.router.navigate(['app'], {queryParams : ['/items', memoId]});
  }

  public drop(event: CdkDragDrop<Ingredient[]>) {
    moveItemInArray(
      this.memo.Ingredients,
      event.previousIndex,
      event.currentIndex
    );
    this.UpdateIngredientsOnMemo();
  }

  public async CheckCurrentMemoIndex() {
    this.memoService.onMemoClicked.emit(this.memo);
  }

  public ToggleEditMemo(cancel: boolean) {

    this.ToggleZdepthClass();
    this.memo.EditMemo = !this.memo.EditMemo;
    this.hasClicked = true;
    this.currentActiveMemoIndex = -1;

    if (cancel) {
      this.memoService.onUpdateMemo$.next(this.memo);
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
  }

  private async getDocs(q: Query<DocumentData>) {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {});
  }

  public AddNewIngredientsDialogue() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      Ingredients: ([] = [...this.memo.Ingredients]),
    };

    const dialogRef = this.dialog.open(IngredientsModalComponent, dialogConfig);
    this.ToggleZdepthClass();

    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data === null || data === undefined) return;
        this.memo.Ingredients = [];
        this.memo.Ingredients = data as Ingredient[];
        this.UpdateIngredientsOnMemo();
        this.ToggleZdepthClass();
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

  public UpdateIngredientsOnMemo() {
    this.memo.Title = (document.getElementById('title-input') as HTMLInputElement).value;
    this.memo.Description = (document.getElementById('description-input') as HTMLInputElement).value;
    this.dateText = this.memoService.UpgradeCurrentMemoIngredients(this.memo);
  }

  /*Decrement Ingredient from current memo list */
  public DecrementIngredient(chosenIngredientIcon: HTMLElement) {
    const icon = chosenIngredientIcon.innerText as IngredientType;

    if (icon === undefined || icon === null) return;

    let targetedIngredientInList = this.memo.Ingredients.find(
      (x) => x.Icon === icon
    );

    if (targetedIngredientInList === undefined) return;

    // if amount is over 1 then decrement
    if (targetedIngredientInList.Amount > 1) {
      targetedIngredientInList.Amount--;
    } else {
      // else remove the whole item
      targetedIngredientInList.Amount--;
      let newIngredientList = this.memo.Ingredients.filter(
        (removeIngredient) => removeIngredient.Icon === icon
      );
      if (
        this.memo.Ingredients.length === 1 &&
        newIngredientList[0].Amount <= 0
      ) {
        this.memo.Ingredients = [];
        this.DeleteMemo();
        return;
      } else {
        const objectIndex = this.memo.Ingredients.indexOf(
          targetedIngredientInList,
          0
        );
        this.memo.Ingredients.splice(objectIndex, 1);

        if (this.memo.Ingredients.length <= 0) {
        }
        return;
      }
    }
  }

  public ResetClick() {
    setTimeout(() => {
      this.hasClicked = false;
    }, 100);
  }

  /*Delete memo */
  public DeleteMemo() {
    this.memoService.OpenDeleteMemoDialog(this.memo);
  }

  /*Send memo as mail */
  public SendAsMailDialog() {
    // console.log('opening mail form memo sent as mail!');
    this.ToggleZdepthClass();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: '' as string,
      memo: this.memo as Memo,
    };

    const dialogRef = this.dialog.open(MemoAsMailComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((emailData) => {
      this.ToggleZdepthClass();
      if (emailData === undefined) return;
      new NewDialogComponent(this.dialog).OpenNewNotificationDialog(
        'Your memo was sent to : ' + emailData
      );
    });
  }

  /*Set different color if disabled */
  public GetColor() {
    return this.IsDisabled ? 'red' : 'green';
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

  private ToggleZdepthClass() {
    document.getElementById('add-new-ingredients-button')?.classList.toggle('my-z-depth');
    document.getElementById('edit-button')?.classList.toggle('my-z-depth');
    document.getElementById('add-new-ingredients-button')?.classList.toggle('my-z-depth');
    document.getElementById('remove-button')?.classList.toggle('my-z-depth');
    document.getElementById('send-as-mail-button')?.classList.toggle('my-z-depth');
  }

  public BringForth(myId: number) {
    const element = document.getElementById(`__item${this.myMemoIndex}`);
    if (element) {
      element.classList.add('bring-front');
    }
  }
};
