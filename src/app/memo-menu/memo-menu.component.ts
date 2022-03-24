import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { IMemo } from '../interfaces/interfaces';
import { MemoIcon, MemoIcons } from '../memo/memo-icons/memo-icons';
import { Memo } from '../memo/memo.model';
import { Ingredient } from '../shared/ingredients';

@Component({
  selector: 'app-memo-menu',
  templateUrl: './memo-menu.component.html',
  styleUrls: ['./memo-menu.component.scss']
})
export class MemoMenuComponent implements OnInit {

  @Output() public memoCreated = new EventEmitter<{
    Id: number,
    Title: string,
    Description: string,
    MemoIcon: MemoIcon,
    AddIngredients: boolean,
    EditMemo: boolean,
    Ingredients: Ingredient[]}>();
  @Output() public orderMemosByLetter: EventEmitter<Boolean> = new EventEmitter;
  @Output() public orderMemosByID: EventEmitter<Boolean> = new EventEmitter;
  @Output() public orderMemosByCreated: EventEmitter<Boolean> = new EventEmitter;
  @Output() public stackMemos: EventEmitter<Boolean> = new EventEmitter;
  OrderMemosByLetter() {
    this.orderMemosByLetter.emit(true);
  }
  OrderMemosByID() {
    this.orderMemosByID.emit(true);
  }
  OrderMemosByCreated() {
    this.orderMemosByCreated.emit(true);
  }
  StackMemos() {
    this.stackMemos.emit();
  }
  public addedMemo() {
    let newMemo : Memo = new Memo(-1, "Monday Groceries", "Fruit Monday!", new Date(), MemoIcons.memo.icon,[]);
    // emit this object created!
    this.memoCreated.emit(newMemo);
  }
  constructor() {
  }

  ngOnInit() {
  }

}
