import { IMemo } from "../interfaces/interfaces";
import { Ingredient } from "../shared/ingredients";
import { MemoIcon } from "./memo-icons/memo-icons";
/**A single memo model */
export class Memo implements IMemo {

  public AddIngredients: boolean;
  public EditMemo: boolean;

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
  public ChangeIngredientAmount() {

  };
  public DeleteIngredient() {

  };
  constructor(
<<<<<<< HEAD
    public Id: string = '',
    public Index : number = -1,
    public Title: string = '',
    public Description: string = '',
    public CreatedDate : Date = new Date(),
    public MemoIcon: MemoIcon = "📝",
=======
    public Id: string = '-1',
    public Index : number = -1,
    public Title: string = "",
    public Description: string = "",
    public CreatedDate: Date = new Date(),
    public MemoIcon: MemoIcon ="📝",
>>>>>>> 2e8d54683d2209dcc11ffa4d9e8365caebb3c0bd
    public Ingredients: Ingredient[] = [],
  ) {
    this.AddIngredients = false;
    this.EditMemo = false;
  }
};
