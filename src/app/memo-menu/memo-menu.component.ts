import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import AddNewMemoComponent from '../memo/add-new-memo/add-new-memo.component';
import { MemoIcons } from '../memo/memo-icons/memo-icons';
import { Memo } from '../memo/memo.model';
import * as uuid from 'uuid';
let _id = uuid.v4();
@Component({
  selector: 'app-memo-menu',
  templateUrl: './memo-menu.component.html',
  styleUrls: ['./memo-menu.component.scss']
})
export class MemoMenuComponent implements OnInit {
  @Output() public memoCreated: EventEmitter<Memo> = new EventEmitter;
  @Output() public orderMemosByLetter: EventEmitter<Boolean> = new EventEmitter;
  @Output() public orderMemosByID: EventEmitter<Boolean> = new EventEmitter;
  @Output() public orderMemosByCreated: EventEmitter<Boolean> = new EventEmitter;
  @Output() public stackMemos: EventEmitter<Boolean> = new EventEmitter;

  constructor(public dialog: MatDialog) { }

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

  /**Emits newly created memo and makes sure the incoming data is a Memo class object*/
  MemoCreated(newMemo: Memo) {
    try {
      this.memoCreated.emit(newMemo);
    } catch (error) {
      console.log("message: ", error);
      throw new Error("Incoming object is not a type of Memo");
    }
  }
  public OpenNewMemoDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      Id: '',
      Title: '',
      Description: '',
      CreatedDate: new Date(),
      MemoIcon: MemoIcons.memo,
      Ingredients : [],
    }

    const dialogRef = this.dialog.open(AddNewMemoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data === null || data === undefined) return;
      this.MemoCreated(data);
      console.log("data from dialog component: ", data);
    });

  }

  ngOnInit() {
    let menuElement = document.getElementById('memomenu');
    if (menuElement === undefined || menuElement === null) return;
    if (!menuElement.classList.contains('scaleUp'))
    {
      menuElement.classList.add('scaleUp');
    } else {
      menuElement.classList.remove('scaleUp');
    }


  }
}
