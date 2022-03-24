import { MemoIcon } from "../memo/memo-icons/memo-icons";
import { Ingredient } from "../shared/ingredients";

export interface IIcons {
  icon: string;
}
export interface IMemo {
  Id: number;
  Title: string;
  Description: string;
  CreatedDate: Date;
  MemoIcon: MemoIcon;
  Ingredients: Ingredient[];
}

export interface IFood {
  Name: string;
  Icon: string;
  Amount: number;
}
