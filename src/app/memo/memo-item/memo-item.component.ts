import { Component } from '@angular/core';
import {MemoDescriptionComponent} from '../memo-description/memo-description.component';
 import { MemoIcons } from 'src/app/memo-icons/memo-icons';
import { IMemo } from 'src/app/interfaces/interfaces';
import { Food } from 'src/app/food/food';
// decorator, needed for angular components
@Component({
  selector: 'app-memo-item',
  templateUrl: './memo-item.component.html',
  styleUrls: ['./memo-item.component.scss']
})


export class MemoItemComponent implements IMemo {

  constructor() {
    this.Title = "New Memo";
    this.PlaceHolderText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    this.MemoDescription = new MemoDescriptionComponent();
    this.UsedIcon = new MemoIcons().IconList.memo;
    this.FoodList = [];
  }
  public Title = "";
  public PlaceHolderText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  public MemoDescription = new MemoDescriptionComponent();
  public Icon = new MemoIcons();
  public UsedIcon = this.Icon.IconList.memo;
  public FoodList: Food[] = [];
  GetCurrentIcon() {
    return this.UsedIcon;
  }
}
