import { Component } from '@angular/core';
import { MemoIcons } from './memo/memo-icons/memo-icons';
import { Memo } from './memo/memo.model';
import { Ingredient, ingredients } from './shared/ingredients';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public RemoveMemo(id: number) {
    // const objectIndex = this.MemoList.indexOf(memo, 0);
    // this.MemoList.splice(objectIndex, 1);
  }
  public AddNewMemo() {
       // const Id = this.MemoList.length + 1;
    // this.MemoList = [...this.MemoList,new Memo(Id,Title,Description,Icon,false,false,false,[...Ingredients])]

  }
  public EditMemo(currentMemo : Memo) {
    console.log("value in edit button: ", currentMemo);
    // console.log("value in memo: ", this.MemoList.find((m) => Id === m.Id));

  }
  title = 'super-memo-angular';
  public Memos: Memo[] = [
    new Memo(0,"Monday Groceries", "Fruit Monday!", MemoIcons.memo.icon, false,false,false,[
      new Ingredient(ingredients.applered.Name, ingredients.applered.Icon, 5),
      new Ingredient(ingredients.banana.Name, ingredients.banana.Icon, 10),
      new Ingredient(ingredients.cucumber.Name, ingredients.cucumber.Icon, 1),
      new Ingredient(ingredients.applegreen.Name, ingredients.applegreen.Icon, 5),
      new Ingredient(ingredients.pear.Name, ingredients.pear.Icon, 8),
    ]),
    new Memo(1,"Monday Groceries", "Fruit Monday!", MemoIcons.memo.icon,false,false,false,[
      new Ingredient(ingredients.pear.Name, ingredients.pear.Icon, 8),
      new Ingredient(ingredients.applegreen.Name, ingredients.applegreen.Icon, 5),
      new Ingredient(ingredients.banana.Name, ingredients.banana.Icon, 10),
      new Ingredient(ingredients.applered.Name, ingredients.applered.Icon, 5),
      new Ingredient(ingredients.cucumber.Name, ingredients.cucumber.Icon, 1),
    ]),
    new Memo(2,"Pick these up on thursday", "Remember these!", MemoIcons.importantmemo.icon,false,false,false,[
      new Ingredient(ingredients.applegreen.Name, ingredients.applegreen.Icon, 5),
      new Ingredient(ingredients.banana.Name, ingredients.banana.Icon, 10),
      new Ingredient(ingredients.pear.Name, ingredients.pear.Icon, 8),
      new Ingredient(ingredients.cucumber.Name, ingredients.cucumber.Icon, 1),
      new Ingredient(ingredients.applered.Name, ingredients.applered.Icon, 5),
    ]),
    new Memo(3,"Monday Groceries", "Fruit Monday!", MemoIcons.memo.icon,false,false,false,[
      new Ingredient(ingredients.applered.Name, ingredients.applered.Icon, 5),
      new Ingredient(ingredients.pear.Name, ingredients.pear.Icon, 8),
      new Ingredient(ingredients.banana.Name, ingredients.banana.Icon, 10),
      new Ingredient(ingredients.cucumber.Name, ingredients.cucumber.Icon, 1),
      new Ingredient(ingredients.applegreen.Name, ingredients.applegreen.Icon, 5),
    ]),
  ];
}
