import { Component, ElementRef, OnInit } from '@angular/core';
import { Ingredient, ingredients, ingredientsArray, IngredientType} from 'src/app/shared/ingredients';
import { MemoIcon, MemoIcons } from '../../memo-icons/memo-icons';
import { Memo } from '../../memo.model';
import * as uuid from 'uuid';
let _id = uuid.v4();
@Component({
  selector: 'app-memo-list',
  templateUrl: './memo-list.component.html',
  styleUrls: ['./memo-list.component.scss']
})

export class MemoListComponent implements OnInit {

  ngOnInit(): void {
    setTimeout(() => {
      this.IsDisabled = false;
    }, 2000);
    // throw new Error('Method not implemented.');
  }

  public ChangeMemo(value : any, Id : string) {
    console.log("value in edit button: ", value);
    console.log("value in memo: ", this.MemoList.find((m) => Id === m.Id));
  }
  public AddMemo(Title: string, Description: string,CreatedDate : Date, Icon: MemoIcon, Ingredients: Ingredient[]) {
    const Id = uuid.v4();
    this.MemoList = [...this.MemoList, new Memo(Id, Title, Description,CreatedDate,Icon, [...Ingredients])];
  }
  public RemoveMemo(memo : Memo) {
    const objectIndex = this.MemoList.indexOf(memo, 0);
    this.MemoList.splice(objectIndex, 1);
  }
  public UpdateInputText(e: Event) {
    // Telling angular that we know that this is an input element with explicit casting
    // works almost exactly like useRef() in React
    this.InputTextTest = (<HTMLInputElement>e.target).value
  }
  public GetColor() {
    return this.IsDisabled ? 'red' : 'green';
  };

  public _ingredients = ingredientsArray;
  public AddIngredients: boolean = false;
  public EditMemo: boolean = false;
  public DeleteMemo: boolean = false;
  public Icons = MemoIcons;
  public TextTest = '';
  public InputTextTest = '';
  public IsDisabled: boolean = true;
  public MemoList: Memo[] = [
    new Memo(uuid.v4(),"Monday Groceries", "Fruit Monday!",new Date(), MemoIcons.memo.icon, [
      new Ingredient(ingredients.applered.Name, ingredients.applered.Icon, 5),
      new Ingredient(ingredients.banana.Name, ingredients.banana.Icon, 10),
      new Ingredient(ingredients.cucumber.Name, ingredients.cucumber.Icon, 1),
      new Ingredient(ingredients.applegreen.Name, ingredients.applegreen.Icon, 5),
      new Ingredient(ingredients.pear.Name, ingredients.pear.Icon, 8),
    ]),
    new Memo(uuid.v4(),"Monday Groceries", "Fruit Monday!",new Date(), MemoIcons.memo.icon,[
      new Ingredient(ingredients.pear.Name, ingredients.pear.Icon, 8),
      new Ingredient(ingredients.applegreen.Name, ingredients.applegreen.Icon, 5),
      new Ingredient(ingredients.banana.Name, ingredients.banana.Icon, 10),
      new Ingredient(ingredients.applered.Name, ingredients.applered.Icon, 5),
      new Ingredient(ingredients.cucumber.Name, ingredients.cucumber.Icon, 1),
    ]),
    new Memo(uuid.v4(),"Pick these up on thursday", "Remember these!",new Date(), MemoIcons.importantmemo.icon,[
      new Ingredient(ingredients.applegreen.Name, ingredients.applegreen.Icon, 5),
      new Ingredient(ingredients.banana.Name, ingredients.banana.Icon, 10),
      new Ingredient(ingredients.pear.Name, ingredients.pear.Icon, 8),
      new Ingredient(ingredients.cucumber.Name, ingredients.cucumber.Icon, 1),
      new Ingredient(ingredients.applered.Name, ingredients.applered.Icon, 5),
    ]),
    new Memo(uuid.v4(),"Monday Groceries", "Fruit Monday!",new Date(), MemoIcons.memo.icon,[
      new Ingredient(ingredients.applered.Name, ingredients.applered.Icon, 5),
      new Ingredient(ingredients.pear.Name, ingredients.pear.Icon, 8),
      new Ingredient(ingredients.banana.Name, ingredients.banana.Icon, 10),
      new Ingredient(ingredients.cucumber.Name, ingredients.cucumber.Icon, 1),
      new Ingredient(ingredients.applegreen.Name, ingredients.applegreen.Icon, 5),
    ]),
  ];
};
