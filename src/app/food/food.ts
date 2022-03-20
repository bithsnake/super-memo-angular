import { IFood } from "../interfaces/interfaces";

export class Food implements IFood{
  constructor() {
    this.Name = ""
    this.Icon = ""
    this.Amount = 0;
  }
  public Name: string;
  public Icon: string;
  public Amount: number;
};
