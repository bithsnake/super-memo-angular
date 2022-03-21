import { MemoIcon } from "../memo/memo-icons/memo-icons";
import { MemoDescriptionComponent } from "../memo/memo-description/memo-description.model";

export interface IIcons {
  icon: string;
}
export interface IMemo {
  Title: string;
  MemoDescription: MemoDescriptionComponent;
  PlaceHolderText: string;
  MemoIcon: MemoIcon;
}

export interface IFood {
  Name: string;
  Icon: string;
  Amount: number;
}
