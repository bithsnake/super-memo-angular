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
  sweetpotato :   { Name: "Sweetpotato", Icon: '🍠' as IngredientType},
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
    Name: "Red Apple", Icon: '🍎' as IngredientType
  },
  {
    Name: "Green Apple",Icon: '🍏' as IngredientType,
  },
  {
    Name: "Avocado", Icon: '🥑' as IngredientType,
  },
  {
    Name: "Bacon", Icon: '🥓' as IngredientType,
  },
  {
    Name: "Banana" , Icon: '🍌' as IngredientType,
  },
  {
    Name: "Baguette bread", Icon: '🥖' as IngredientType,
  },
  {
    Name: "Bread", Icon: '🍞' as IngredientType,
  },
  {
    Name: "Broccoli", Icon: '🥦' as IngredientType,
  },
  {
    Name: "Brown egg",Icon: '🟤' as IngredientType,
  },
  {
    Name: "Carrot", Icon: '🥕' as IngredientType,
  },
  {
    Name: "Cattle", Icon: '🐄' as IngredientType,
  },
  {
    Name: "Corn", Icon: '🌽' as IngredientType,
  },
  {
    Name: "Coconut", Icon: '🥥' as IngredientType,
  },
  {
    Name: "Cucumber", Icon: '🥒' as IngredientType,
  },
  {
    Name: "Eggplant", Icon: '🍆' as IngredientType,
  },
  {
    Name: "Egg", Icon: '🥚' as IngredientType,
  },
  {
    Name: "Salmon", Icon: '🐟' as IngredientType,
  },
  {
    Name: "Fries", Icon: '🍟' as IngredientType,
  },
  {
    Name: "Grapes",Icon: '🍇' as IngredientType,
  },
  {
    Name: "Hot pepper",Icon: '🌶️' as IngredientType,
  },
  {
    Name: "Kiwi", Icon: '🥝' as IngredientType,
  },
  {
    Name: "Leafy greens",Icon: '🥬' as IngredientType,
  },
  {
    Name: "Lemon",Icon:  '🍋' as IngredientType,
  },
  {
    Name: "Mango", Icon: '🥭' as IngredientType,
  },
  {
    Name: "Melon", Icon: '🍈' as IngredientType,
  },
  {
    Name: "Mushroom", Icon: '🍄' as IngredientType,
  },
  {
    Name: "Onion",Icon:  '🧅' as IngredientType,
  },
  {
    Name: "Rice", Icon: '🍙' as IngredientType,
  },
  {
    Name: "Sausage/Hot dog", Icon: '🌭' as IngredientType,
  },
  {
    Name: "Strawberry", Icon: '🍓' as IngredientType,
  },
  {
    Name: "Sweetpotato", Icon: '🍠' as IngredientType,
  },
  {
    Name: "Tomato", Icon: '🍅' as IngredientType,
  },
  {
    Name: "Peanuts", Icon: '🥜' as IngredientType,
  },
  {
    Name: "Pear", Icon: '🍐' as IngredientType,
  },
  {
    Name: "Pasta", Icon: '🍝' as IngredientType,
  },
  {
    Name: "Pineapple",Icon: '🍍' as IngredientType,
  },
  {
    Name: "Potato",Icon: '🥔' as IngredientType,
  },
  {
     Name: "Pork",Icon: '🐖' as IngredientType
  },
  {
     Name: "Popcorn",Icon: '🍿' as IngredientType
  },
  {
    Name: "Watermelon", Icon: '🍉' as IngredientType
  }
];
