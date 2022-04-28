import { MemoIcon } from "../memo/memo-icons/memo-icons";
import { Ingredient } from "../shared/ingredients";

export interface IIcons {
  icon: string;
}
export interface IMemo {
  Id: string;
  Index: number;
  Title: string;
  Description: string;
  CreatedDate: string;
  MemoIcon: MemoIcon;
  Ingredients: Ingredient[];
}

export interface IFood {
  Name: string;
  Icon: string;
  Amount: number;
}
