import { Ingredient } from "../food/food-list/ingredients";
import { MemoIcon } from "./memo-icons/memo-icons";

export class Memo {
  public Title: string;
  public Description: string;
  public Ingredients: Ingredient[];
  public MemoIcon : MemoIcon;

  constructor(title: string, desc : string, memoicon : MemoIcon, ingredients : Ingredient[]) {
    this.Title = title;
    this.Description = desc;
    this.Ingredients = ingredients;
    this.MemoIcon = memoicon;
  }
};
