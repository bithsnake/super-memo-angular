import { Component, OnInit } from '@angular/core';
import { MemoIcons } from './memo/memo-icons/memo-icons';
import { Memo } from './memo/memo.model';
import { Ingredient, ingredients } from './shared/ingredients';
import { CdkDragDrop,moveItemInArray} from '@angular/cdk/drag-drop';

import { compareName, compareId, compareCreatedDate, PrevScrollY,ScrollBackUp,checkOverflow } from "./methods/methods";
import * as uuid from 'uuid';

PrevScrollY();


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // document.querySelector('.memo-item')?.addEventListener('click', this.CheckMemoItem);
  }

  public UseRow: boolean = true;
  public IsOverflowing: boolean = false;
  public ScrollBackUp = ScrollBackUp;
  public checkOverflow = checkOverflow;


  public CheckMemoItem(e: Event) {
    const _e = (e.currentTarget as HTMLElement);
    _e.classList.add('rotate-element');
    console.log("memo item is active");
  }

  public AddNewMemoToList(newMemo: Memo) {
    try {
      this.Memos.push(newMemo);
    } catch (error) {
      console.log("Error creating new memo: ", newMemo);
      throw new Error("Object is not a type of Memo");
    }
  }
  public RemoveMemo(memo: Memo) {
    const objectIndex = this.Memos.indexOf(memo, 0);
    this.Memos.splice(objectIndex, 1);
  }
  public EditMemo(currentMemo : Memo) {
    console.log("value in edit button: ", currentMemo);
    // console.log("value in memo: ", this.MemoList.find((m) => Id === m.Id));

  }

  public OrderMemosByLetter = () => this.Memos.sort(compareName);
  public OrderMemosByID = () => this.Memos.sort(compareId);
  public OrderMemosByCreated = () => this.Memos.sort(compareCreatedDate);

  public ToggleMemosFlexFlow(BackToTopElement: HTMLElement, ItemListElement : HTMLElement) {
    this.UseRow = !this.UseRow;
    this.IsOverflowing = this.checkOverflow(BackToTopElement,ItemListElement);
  }

  public drop(event : CdkDragDrop<Ingredient[]>) {
    moveItemInArray(this.Memos, event.previousIndex, event.currentIndex);
  }

  title = 'super-memo-angular';
  public Memos: Memo[] = [
    new Memo(uuid.v4(),"Monday Groceries", "Fruit Monday!", new Date(), MemoIcons.memo.icon,[
      new Ingredient(ingredients.applered.Name, ingredients.applered.Icon, 5),
      new Ingredient(ingredients.banana.Name, ingredients.banana.Icon, 10),
      new Ingredient(ingredients.cucumber.Name, ingredients.cucumber.Icon, 1),
      new Ingredient(ingredients.applegreen.Name, ingredients.applegreen.Icon, 5),
      new Ingredient(ingredients.pear.Name, ingredients.pear.Icon, 8),
    ]),
    new Memo(uuid.v4(),"A new day, new list!", "More fruit!", new Date(), MemoIcons.memo.icon,[
      new Ingredient(ingredients.pear.Name, ingredients.pear.Icon, 8),
      new Ingredient(ingredients.applegreen.Name, ingredients.applegreen.Icon, 5),
      new Ingredient(ingredients.banana.Name, ingredients.banana.Icon, 10),
      new Ingredient(ingredients.applered.Name, ingredients.applered.Icon, 5),
      new Ingredient(ingredients.cucumber.Name, ingredients.cucumber.Icon, 1),
    ]),
    new Memo(uuid.v4(),"Pick these up on thursday", "Remember these!", new Date(), MemoIcons.importantmemo.icon,[
      new Ingredient(ingredients.applegreen.Name, ingredients.applegreen.Icon, 5),
      new Ingredient(ingredients.banana.Name, ingredients.banana.Icon, 10),
      new Ingredient(ingredients.pear.Name, ingredients.pear.Icon, 8),
      new Ingredient(ingredients.cucumber.Name, ingredients.cucumber.Icon, 1),
      new Ingredient(ingredients.applered.Name, ingredients.applered.Icon, 5),
    ]),
    new Memo(uuid.v4(),"Get these from Ica", "//Kimmo", new Date(), MemoIcons.memo.icon,[
      new Ingredient(ingredients.applered.Name, ingredients.applered.Icon, 5),
      new Ingredient(ingredients.pear.Name, ingredients.pear.Icon, 8),
      new Ingredient(ingredients.banana.Name, ingredients.banana.Icon, 10),
      new Ingredient(ingredients.cucumber.Name, ingredients.cucumber.Icon, 1),
      new Ingredient(ingredients.applegreen.Name, ingredients.applegreen.Icon, 5),
    ]),
  ];
}
