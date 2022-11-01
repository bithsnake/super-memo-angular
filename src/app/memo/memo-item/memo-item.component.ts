import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Ingredient, IngredientType } from 'src/app/shared/ingredients';
import {  MemoIcons } from '../memo-icons/memo-icons';
import { Memo } from '../memo.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NewDialogComponent } from 'src/app/shared/new-dialog/new-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IngredientsModalComponent } from 'src/app/shared/ingredients-modal/ingredients-modal.component';
import { MemoAsMailComponent } from 'src/app/memo-as-mail/memo-as-mail.component';
import { MemoServices } from 'src/app/shared/services/memo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as firestore from 'firebase/firestore';
const MAX_WIDTH = "20rem";
enum UpdateOperation {
  ChangeOrder,
  UpdateAmount,
  UpdateText,
  UpdateAll,
}
@Component({
  selector: 'app-memo-item',
  templateUrl: './memo-item.component.html',
  styleUrls: ['./memo-item.component.scss'],
})
export class MemoItemComponent implements OnInit,AfterViewInit {
  @Input() public memo!: Memo;
  @Input() public currentActiveMemoIndex: number = -1;
  @Input() public myMemoIndex: number = -1;
  @Input() public myId: number = -1;
  public dateText: string = "";
  public max_width = MAX_WIDTH;
  public Icons = MemoIcons;
  public IsDisabled: boolean = false;
  @Input() public currentMemos!: Memo[];
  constructor(
    private dialog: MatDialog,
    public memoService: MemoServices,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    document.getElementsByClassName('hide-item').item(0)?.classList.replace('hide-item', 'show-item');
    //TODO From memo-item: Check if it works to set memo.Index to routers param ['id']
    this.route.params.subscribe((params: Params) => {
      const num = params['id'];
        this.memo.Index = num;
    });

    this.memoService.onCancelEditMemo.subscribe((cancel: boolean) => {
      this.ToggleEditMemo(false);
      console.log("clicked on the background canceling other memos")
    });
    // Date to Timestamp
    const t = firestore.Timestamp.fromDate(new Date());
    // Timestamp to Date
    this.dateText = t.toDate().toLocaleDateString();
  }


  /**Add an index number to the end of the id */
  ngAfterViewInit(): void {
    let element = document.getElementById('__item');
    if (element) {
      element.id += String(this.myMemoIndex);
    }
  }

  //TODO From memo-item: Make item index use the routelink param as a reference
  private GoToItem(memoId: number) {
    console.log("this.router snapshot: " + this.route.snapshot);
    console.log("this.router data: " + this.route.data);
    console.log("this.router params: " + this.route.params);
    console.log("this.router params: " + this.route.params);
  }

  /**When dropping a selected item in the Ingredients array */
  public drop(event: CdkDragDrop<Ingredient[]>) {
    moveItemInArray(
      this.memo.Ingredients,
      event.previousIndex,
      event.currentIndex
    );
    this.UpdateIngredientsOnMemo(UpdateOperation.ChangeOrder);
  }

  //TODO From memo-item: In the future, use this to open perhaps a modal with the memo you want to edit?
  /**Emit a event when an item is clicked */
  private async CheckCurrentMemoIndex() { this.memoService.onMemoClicked$.next(this.memo) };

  public ToggleEditMemo(cancel: boolean) {
    this.ToggleZIndexClassForButtons();
    this.memo.EditMemo = !this.memo.EditMemo;
    if (cancel === true) {
      this.memoService.onMemoUpdated$.next(this.memo);
      this.memoService.onResetCurrentMemoIndexOnAll.next(this.memo);
    } else {
      if (this.memo.EditMemo === false) {
        this.UpdateIngredientsOnMemo(UpdateOperation.UpdateAll);
        this.memoService.onResetCurrentMemoIndexOnAll.next(this.memo);
        return;
      }
    }
    this.CheckCurrentMemoIndex();
  }

  public AddNewIngredientsDialogue() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {Ingredients: ([] = [...this.memo.Ingredients])};

    const dialogRef = this.dialog.open(IngredientsModalComponent, dialogConfig);
    this.ToggleZIndexClassForButtons();

    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data === null || data === undefined) return;
        this.memo.Ingredients = [];
        this.memo.Ingredients = data as Ingredient[];
        this.UpdateIngredientsOnMemo(UpdateOperation.UpdateAmount);
        this.ToggleZIndexClassForButtons();
      },
      error: (error) => {
        new NewDialogComponent(this.dialog).OpenNewNotificationDialog('Could not add ingredient, send a ticket to your support deparmtent');
        console.error("Could not add ingredient2" , error);
      },
      complete: () => this.memoService.onNewIngredientsAdded$.next("New ingredients added!"),
    });
  }
  private UpdateIngredientsOnMemo(operation: UpdateOperation): void {
      switch (operation) {
        case UpdateOperation.ChangeOrder:
          this.memoService.UpgradeCurrentMemoIngredients(this.memo);
        return;
        case UpdateOperation.UpdateAmount:
          this.memo.Ingredients = this.memo.Ingredients.filter(x => x.Amount > 0);
          this.memoService.UpgradeCurrentMemoIngredients(this.memo);
        return;
        case UpdateOperation.UpdateText:
          this.memo.Title = (document.getElementById('title-input') as HTMLInputElement).value;
          this.memo.Description = (document.getElementById('description-input') as HTMLInputElement).value;
          this.memoService.UpgradeCurrentMemoIngredients(this.memo);
        return;
        case UpdateOperation.UpdateAll:
          this.memo.Title = (document.getElementById('title-input') as HTMLInputElement).value;
          this.memo.Description = (document.getElementById('description-input') as HTMLInputElement).value;
          this.memo.Ingredients = this.memo.Ingredients.filter(x => x.Amount > 0);
          this.memoService.UpgradeCurrentMemoIngredients(this.memo);
          break;
      }
  }
  /*Decrement Ingredient from current memo list */
  public DecrementIngredient(chosenIngredientIcon: HTMLElement) : void {
    const icon = chosenIngredientIcon.innerText as IngredientType;
    let targetedIngredientInList: Ingredient = this.memo.Ingredients.find((x) => x.Icon === icon) as Ingredient;

    // If amount is over 1 then decrement
    if (targetedIngredientInList.Amount > 1) {
      targetedIngredientInList.Amount--;
      return;
    }
      // Else ask if item should be removed, if not, the ingredient-list will be empty with the possibility to add more ingredients
    targetedIngredientInList.Amount--;
      if (this.memo.Ingredients.length === 1 && targetedIngredientInList.Amount <= 0) {
        this.memo.Ingredients = [];
        this.DeleteMemo();
        return;
    }

    // Else just update the list with one less ingredient
    this.UpdateIngredientsOnMemo(UpdateOperation.UpdateAmount); // just in case

  }
  /*Increment Ingredient from current memo list */
  public IncrementAmount(chosenIngredientIcon: HTMLElement) : void {
    const icon = chosenIngredientIcon.innerText as IngredientType;
    let targetedIngredientInList: Ingredient = this.memo.Ingredients.find((x) => x.Icon === icon) as Ingredient;

    // If amount is over 1 then decrement
    if (targetedIngredientInList.Amount < 99) { targetedIngredientInList.Amount++; return; }
      new NewDialogComponent(this.dialog).OpenNewNotificationDialog('You can not add more than 100 ingredients ‼️');
      targetedIngredientInList.Amount = 100;
  }
  /*Delete memo */
  public DeleteMemo = () : void =>  this.memoService.OpenDeleteMemoDialog(this.memo);

  /*Send memo as mail */
  public SendAsMailDialog() {
    this.ToggleZIndexClassForButtons();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {message: '' as string,memo: this.memo as Memo};

    const dialogRef = this.dialog.open(MemoAsMailComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((emailData) => {
      this.ToggleZIndexClassForButtons();
      if (emailData === undefined) return;
      new NewDialogComponent(this.dialog).OpenNewNotificationDialog('Your memo was sent to : ' + emailData);
    });
  }
  /**Toggle z index (z depth) for buttons */
  private ToggleZIndexClassForButtons() : void {
    document.getElementById('add-new-ingredients-button')?.classList.toggle('my-z-depth');
    document.getElementById('edit-button')?.classList.toggle('my-z-depth');
    document.getElementById('add-new-ingredients-button')?.classList.toggle('my-z-depth');
    document.getElementById('remove-button')?.classList.toggle('my-z-depth');
    document.getElementById('send-as-mail-button')?.classList.toggle('my-z-depth');
  }
}
