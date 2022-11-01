/**All the ingredients types (not all of them yet) */
export type IngredientType = AppleRed | AppleGreen | Avocado | Bacon | Banana | BaguetteBread | Bread | Broccoli | Brownegg | Carrot | Cattle
  | Corn | Coconut | Cucumber | Eggplant | Egg | Fish | Fries | Grapes | Hotpepper | Kiwi | LeafyGreens | Lemon | Mango
  | Melon | Mushroom | Onion | Rice | Sausage | Strawberry | Sweetpotato | Tomato | Peanuts | Pear | Pasta | Pineapple | Potato | Pork | PopCorn | Watermelon;

export type AppleRed = '🍎';
export type AppleGreen = '🍏';
export type Avocado = '🥑';
export type Bacon = '🥓';
export type Banana = '🍌';
export type BaguetteBread = '🥖';
export type Bread = '🍞';
export type Broccoli = '🥦';
export type Brownegg = '🟤';
export type Carrot = '🥕';
export type Cattle = '🐄';
export type Corn = '🌽';
export type Coconut = '🥥';
export type Cucumber = '🥒';
export type Eggplant = '🍆';
export type Egg = '🥚';
export type Fish = '🐟';
export type Fries = '🍟';
export type Grapes = '🍇';
export type Hotpepper = '🌶️';
export type Kiwi = '🥝';
export type LeafyGreens = '🥬';
export type Lemon = '🍋';
export type Mango = '🥭';
export type Melon = '🍈';
export type Mushroom = '🍄';
export type Onion = '🧅';
export type Rice = '🍙';
export type Sausage = '🌭';
export type Strawberry = '🍓';
export type Sweetpotato = '🍠';
export type Tomato = '🍅';
export type Peanuts = '🥜';
export type Pear = '🍐';
export type Pasta = '🍝';
export type Pineapple = '🍍';
export type Potato = '🥔';
export type Pork = '🐖';
export type PopCorn = '🍿';
export type Watermelon = '🍉';

export interface IIngredient {
  Name: string;
  Icon: string;
  Amount: number;
}

/**An Ingredient with parameters : Name, Icon, Amount */
export class Ingredient implements IIngredient{
  /**Name,Icon,Amount */
  constructor(public Name: string, public Icon: IngredientType, public Amount: number) {
  }
}

export const ingredients = {
  applered:       { Name: "Red Apple", Icon: '🍎' as IngredientType},
  applegreen:     { Name: "Green Apple",Icon: '🍏' as IngredientType},
  avocado:        { Name: "Avocado", Icon: '🥑' as IngredientType},
  bacon:          { Name: "Bacon", Icon: '🥓' as IngredientType},
  banana :        { Name: "Banana" , Icon: '🍌' as IngredientType},
  baguettebread : { Name: "Baguette bread", Icon: '🥖' as IngredientType},
  bread :         { Name: "Bread", Icon: '🍞' as IngredientType},
  broccoli :      { Name: "Broccoli", Icon: '🥦' as IngredientType},
  brownegg:       { Name: "Brown egg",Icon: '🟤' as IngredientType},
  carrot:         { Name: "Carrot", Icon: '🥕' as IngredientType},
  cattle :        { Name: "Cattle", Icon: '🐄' as IngredientType},
  corn:           { Name: "Corn", Icon: '🌽' as IngredientType},
  coconut:        { Name: "Coconut", Icon: '🥥' as IngredientType},
  cucumber:       { Name: "Cucumber", Icon: '🥒' as IngredientType},
  eggplant:       { Name: "Eggplant", Icon: '🍆' as IngredientType},
  egg:            { Name: "Egg", Icon: '🥚' as IngredientType},
  fish :          { Name: "Salmon", Icon: '🐟' as IngredientType},
  fries:          { Name: "Fries", Icon: '🍟' as IngredientType},
  grapes:         { Name: "Grapes",Icon: '🍇' as IngredientType},
  hotpepper:      { Name: "Hot pepper",Icon: '🌶️' as IngredientType},
  kiwi :          { Name: "Kiwi", Icon: '🥝' as IngredientType},
  leafygreen :    { Name: "Leafy greens",Icon: '🥬' as IngredientType},
  lemon :         { Name: "Lemon",Icon:  '🍋' as IngredientType},
  mango :         { Name: "Mango", Icon: '🥭' as IngredientType},
  melon:          { Name: "Melon", Icon: '🍈' as IngredientType},
  mushroom :      { Name: "Mushroom", Icon: '🍄' as IngredientType},
  onion:          { Name: "Onion",Icon:  '🧅' as IngredientType},
  rice:           { Name: "Rice", Icon: '🍙' as IngredientType},
  sausage :       { Name: "Sausage/Hot dog", Icon: '🌭' as IngredientType},
  strawberry :    { Name: "Strawberry", Icon: '🍓' as IngredientType},
  sweetpotato :   { Name: "SweetpclickedIngredientotato", Icon: '🍠' as IngredientType},
  tomato:         { Name: "Tomato", Icon: '🍅' as IngredientType},
  peanuts:        { Name: "Peanuts", Icon: '🥜' as IngredientType},
  pear:           { Name: "Pear", Icon: '🍐' as IngredientType},
  pasta:          { Name: "Pasta", Icon: '🍝' as IngredientType},
  pineapple :     { Name: "Pineapple",Icon: '🍍' as IngredientType},
  potato:         { Name: "Potato",Icon: '🥔' as IngredientType},
  pork :          { Name: "Pork",Icon: '🐖' as IngredientType},
  popcorn:        { Name: "Popcorn",Icon: '🍿' as IngredientType},
  watermelon:     { Name: "Watermelon",Icon: '🍉' as IngredientType}
};
export const ingredientsArray = [
  {
    Name: "Red Apple", Icon: '🍎' as IngredientType, showTitle : false,
  },
  {
    Name: "Green Apple",Icon: '🍏' as IngredientType, showTitle : false,
  },
  {
    Name: "Avocado", Icon: '🥑' as IngredientType, showTitle : false,
  },
  {
    Name: "Bacon", Icon: '🥓' as IngredientType, showTitle : false,
  },
  {
    Name: "Banana", Icon: '🍌' as IngredientType, showTitle: false,
  },
  {
    Name: "Baguette bread", Icon: '🥖' as IngredientType, showTitle : false,
  },
  {
    Name: "Bread", Icon: '🍞' as IngredientType, showTitle : false,
  },
  {
    Name: "Broccoli", Icon: '🥦' as IngredientType, showTitle : false,
  },
  {
    Name: "Brown egg",Icon: '🟤' as IngredientType,showTitle : false,
  },
  {
    Name: "Carrot", Icon: '🥕' as IngredientType,showTitle : false,
  },
  {
    Name: "Cattle", Icon: '🐄' as IngredientType,showTitle : false,
  },
  {
    Name: "Corn", Icon: '🌽' as IngredientType,showTitle : false,
  },
  {
    Name: "Coconut", Icon: '🥥' as IngredientType,showTitle : false,
  },
  {
    Name: "Cucumber", Icon: '🥒' as IngredientType,showTitle : false,
  },
  {
    Name: "Eggplant", Icon: '🍆' as IngredientType,showTitle : false,
  },
  {
    Name: "Egg", Icon: '🥚' as IngredientType,showTitle : false,
  },
  {
    Name: "Salmon", Icon: '🐟' as IngredientType,showTitle : false,
  },
  {
    Name: "Fries", Icon: '🍟' as IngredientType,showTitle : false,
  },
  {
    Name: "Grapes",Icon: '🍇' as IngredientType,showTitle : false,
  },
  {
    Name: "Hot pepper",Icon: '🌶️' as IngredientType,showTitle : false,
  },
  {
    Name: "Kiwi", Icon: '🥝' as IngredientType,showTitle : false,
  },
  {
    Name: "Leafy greens",Icon: '🥬' as IngredientType,showTitle : false,
  },
  {
    Name: "Lemon",Icon:  '🍋' as IngredientType,showTitle : false,
  },
  {
    Name: "Mango", Icon: '🥭' as IngredientType,showTitle : false,
  },
  {
    Name: "Melon", Icon: '🍈' as IngredientType,showTitle : false,
  },
  {
    Name: "Mushroom", Icon: '🍄' as IngredientType,showTitle : false,
  },
  {
    Name: "Onion",Icon:  '🧅' as IngredientType,showTitle : false,
  },
  {
    Name: "Rice", Icon: '🍙' as IngredientType,showTitle : false,
  },
  {
    Name: "Sausage/Hot dog", Icon: '🌭' as IngredientType,showTitle : false,
  },
  {
    Name: "Strawberry", Icon: '🍓' as IngredientType,showTitle : false,
  },
  {
    Name: "Sweetpotato", Icon: '🍠' as IngredientType,showTitle : false,
  },
  {
    Name: "Tomato", Icon: '🍅' as IngredientType,showTitle : false,
  },
  {
    Name: "Peanuts", Icon: '🥜' as IngredientType,showTitle : false,
  },
  {
    Name: "Pear", Icon: '🍐' as IngredientType,showTitle : false,
  },
  {
    Name: "Pasta", Icon: '🍝' as IngredientType,showTitle : false,
  },
  {
    Name: "Pineapple",Icon: '🍍' as IngredientType,showTitle : false,
  },
  {
    Name: "Potato",Icon: '🥔' as IngredientType,showTitle : false,
  },
  {
     Name: "Pork",Icon: '🐖' as IngredientType,showTitle : false,
  },
  {
     Name: "Popcorn",Icon: '🍿' as IngredientType,showTitle : false,
  },
  {
    Name: "Watermelon", Icon: '🍉' as IngredientType,showTitle : false,
  }
];
