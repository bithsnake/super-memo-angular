import { MemoIcons } from "../memo-icons/memo-icons";
import { MemoDescriptionComponent } from "../memo/memo-description/memo-description.component";

export interface IIcons {
  icon: string;
}
export interface IMemo {
  Title: string;
  MemoDescription: MemoDescriptionComponent;
  PlaceHolderText: string;
  Icon: MemoIcons;
}

export interface IFood {
  Name: string;
  Icon: string;
  Amount: number;
}
