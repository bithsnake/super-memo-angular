import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IMemo } from '../interfaces/interfaces';
import AddNewMemoComponent from '../memo/add-new-memo/add-new-memo.component';
import { MemoIcon, MemoIcons } from '../memo/memo-icons/memo-icons';
import { Memo } from '../memo/memo.model';
import { Ingredient } from '../shared/ingredients';
import * as uuid from 'uuid';
let _id = uuid.v4();
@Component({
  selector: 'app-memo-menu',
  templateUrl: './memo-menu.component.html',
  styleUrls: ['./memo-menu.component.scss']
})
export class MemoMenuComponent implements OnInit {
  @Output() public memoCreated: EventEmitter<Boolean> = new EventEmitter;
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
  public AddNewMemo() {
    let newMemo : Memo = new Memo(_id, "Monday Groceries", "Fruit Monday!", new Date(), MemoIcons.memo.icon,[]);
    // emit this object created!
    console.log("memo created!");
    this.memoCreated.emit(true);
    this.dialogRef.open(AddNewMemoComponent,{ panelClass: 'custom-dialog-container' });
  }
  constructor(private dialogRef: MatDialog) { }
  ngOnInit() {
    this.AddNewMemo();
  }
}

// export class Something{
//   title = 'angular-material';
//   constructor(private dialogRef: MatDialog) { }

// }
