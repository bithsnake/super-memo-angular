import { Component } from '@angular/core';
import { MemoIcons } from './memo/memo-icons/memo-icons';
import { Memo } from './memo/memo.model';
import { Ingredient, ingredients } from './shared/ingredients';
import { compareName, compareId, compareCreatedDate } from "./methods/methods";

function SetBackToTopElement(InFrame : boolean) {
  let element = document.getElementById('backtotop');
  if (element === null) throw new Error("There is no element with the id: ");

    if (!InFrame) {
      element.classList.replace('full-opacity', 'fade-in');
      element.classList.replace('static', 'sticky');
    } else {
      element.classList.replace('fade-in', 'fade-out');
    }

    element.addEventListener('animationend', (currentAnim) => {
      if (element === null) throw new Error("There is no element with the id: ");
      if (currentAnim.animationName !== 'fadeOut') return;

      element.classList.replace('sticky', 'static');
      element.classList.replace('fade-out', 'full-opacity');
      return;
    });
}

function PrevScrollY() : boolean{
  let lastKnownScrollYPosition: number = 0;
  let InFrame: boolean = false;
  document.addEventListener('scroll', () => {
    lastKnownScrollYPosition = window.scrollY;
    InFrame = window.scrollY < window.screen.availHeight / 4;
      SetBackToTopElement(InFrame);
  });
  return InFrame;
}
PrevScrollY();
// let notInFrame = PrevScrollY() > window.screen.availHeight / 4;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public UseRow: boolean = true;
  public IsOverflowing: boolean = false;
  public ScrollBackUp = () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

  public checkOverflow(BackToTopElement : HTMLElement, ItemListElement : HTMLElement) : boolean
  {
    var curOverflow = BackToTopElement.classList.contains('hidden');

    if (!curOverflow)
      BackToTopElement.classList.replace('hidden', 'show');

    var isOverflowing = ItemListElement.clientWidth < ItemListElement.scrollWidth
        || ItemListElement.clientHeight > window.screen.availHeight;

    if (isOverflowing)
      BackToTopElement.classList.add('show');

     return isOverflowing;
  }
  public AddNewMemo() {
       // const Id = this.MemoList.length + 1;
    // this.MemoList = [...this.MemoList,new Memo(Id,Title,Description,Icon,false,false,false,[...Ingredients])]
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
  title = 'super-memo-angular';
  public Memos: Memo[] = [
    new Memo(0,"Monday Groceries", "Fruit Monday!", new Date(), MemoIcons.memo.icon,[
      new Ingredient(ingredients.applered.Name, ingredients.applered.Icon, 5),
      new Ingredient(ingredients.banana.Name, ingredients.banana.Icon, 10),
      new Ingredient(ingredients.cucumber.Name, ingredients.cucumber.Icon, 1),
      new Ingredient(ingredients.applegreen.Name, ingredients.applegreen.Icon, 5),
      new Ingredient(ingredients.pear.Name, ingredients.pear.Icon, 8),
    ]),
    new Memo(1,"A new day, new list!", "More fruit!", new Date(), MemoIcons.memo.icon,[
      new Ingredient(ingredients.pear.Name, ingredients.pear.Icon, 8),
      new Ingredient(ingredients.applegreen.Name, ingredients.applegreen.Icon, 5),
      new Ingredient(ingredients.banana.Name, ingredients.banana.Icon, 10),
      new Ingredient(ingredients.applered.Name, ingredients.applered.Icon, 5),
      new Ingredient(ingredients.cucumber.Name, ingredients.cucumber.Icon, 1),
    ]),
    new Memo(2,"Pick these up on thursday", "Remember these!", new Date(), MemoIcons.importantmemo.icon,[
      new Ingredient(ingredients.applegreen.Name, ingredients.applegreen.Icon, 5),
      new Ingredient(ingredients.banana.Name, ingredients.banana.Icon, 10),
      new Ingredient(ingredients.pear.Name, ingredients.pear.Icon, 8),
      new Ingredient(ingredients.cucumber.Name, ingredients.cucumber.Icon, 1),
      new Ingredient(ingredients.applered.Name, ingredients.applered.Icon, 5),
    ]),
    new Memo(3,"Get these from Ica", "//Kimmo", new Date(), MemoIcons.memo.icon,[
      new Ingredient(ingredients.applered.Name, ingredients.applered.Icon, 5),
      new Ingredient(ingredients.pear.Name, ingredients.pear.Icon, 8),
      new Ingredient(ingredients.banana.Name, ingredients.banana.Icon, 10),
      new Ingredient(ingredients.cucumber.Name, ingredients.cucumber.Icon, 1),
      new Ingredient(ingredients.applegreen.Name, ingredients.applegreen.Icon, 5),
    ]),
  ];
}
