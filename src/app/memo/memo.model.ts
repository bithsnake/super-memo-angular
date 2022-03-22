import { Ingredient,ingredients, IngredientType } from "../shared/ingredients";
import { MemoIcon } from "./memo-icons/memo-icons";
/**A single memo containing a title, description, icon, add button */
export class Memo {
  public AddIngredient(Ingredient: Ingredient) {
    if (Ingredient === null || Ingredient === undefined) return;
    const IngredientDoesExist = this.Ingredients.filter(x => x.Name === Ingredient.Name).length > 0;
    if (IngredientDoesExist) {
      let IngredientInList = this.Ingredients.find(({Name}) => Ingredient.Name === Name);
      if (IngredientInList === null || IngredientInList === undefined) return;
      IngredientInList.Amount++;
    } else {
      // this.Ingredients = [...this.Ingredients, Ingredient];
      this.Ingredients.push(Ingredient);
    }
  }
  constructor(
    public Id: number,
    public Title: string,
    public Description: string,
    public MemoIcon: MemoIcon,
    public AddIngredients: boolean = false,
    public EditMemo: boolean = false,
    public DeleteMemo: boolean = false,
    public Ingredients: Ingredient[]
  ) {}
};
