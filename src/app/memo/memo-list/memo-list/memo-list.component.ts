import { Component, ElementRef, OnInit } from '@angular/core';
import { Ingredient, ingredients, ingredientsArray, IngredientType} from 'src/app/shared/ingredients';
import { MemoIcon, MemoIcons } from '../../memo-icons/memo-icons';
import { Memo } from '../../memo.model';

@Component({
  selector: 'app-memo-list',
  templateUrl: './memo-list.component.html',
  styleUrls: ['./memo-list.component.scss']
})

export class MemoListComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public ChangeMemo(value : any, Id : number) {
    console.log("value in edit button: ", value);
    console.log("value in memo: ", this.MemoList.find((m) => Id === m.Id));
  }
  public AddMemo(Title: string, Description: string, Icon: MemoIcon, Ingredients: Ingredient[]) {
    const Id = this.MemoList.length + 1;
    this.MemoList = [...this.MemoList,new Memo(Id,Title,Description,Icon,false,false,false,[...Ingredients])]
  }
  public RemoveMemo(memo : Memo) {
    const objectIndex = this.MemoList.indexOf(memo, 0);
    this.MemoList.splice(objectIndex, 1);
  }
  public _ingredients = ingredientsArray;
  public AddIngredients: boolean = false;
  public EditMemo: boolean = false;
  public DeleteMemo: boolean = false;
  public Icons = MemoIcons;
  public MemoList: Memo[] = [
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
};
