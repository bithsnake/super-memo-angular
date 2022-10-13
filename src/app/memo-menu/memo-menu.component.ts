import { Component, OnInit, Output,EventEmitter, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import AddNewMemoComponent from '../memo/add-new-memo/add-new-memo.component';
import { MemoIcons } from '../memo/memo-icons/memo-icons';
import { Memo } from '../memo/memo.model';
import { MemoServices } from '../shared/services/memo.service';
@Component({
  selector: 'app-memo-menu',
  templateUrl: './memo-menu.component.html',
  styleUrls: ['./memo-menu.component.scss']
})
export class MemoMenuComponent implements OnInit {

  @Input() Memos!: Memo[];

  constructor(public dialog: MatDialog, public memoService: MemoServices) {

    console.log("memo menu created");
   }

  OrderMemosByLetter() {
    this.memoService.orderMemosByLetter.emit(true);
  }
  OrderMemosByID() {
    this.memoService.orderMemosByID.emit(true);
  }
  OrderMemosByCreated() {
    this.memoService.orderMemosByCreated.emit(true);
  }
  StackMemos() {
    this.memoService.stackMemos.emit();
  }

  /**Emits newly created memo and makes sure the incoming data is a Memo class object*/
  MemoCreated(newMemo: Memo) {
    try {

      this.memoService.memoCreated.emit(newMemo);
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
    dialogConfig.maxHeight = "64rem";


    const dialogRef = this.dialog.open(AddNewMemoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data === null || data === undefined) return;
      this.MemoCreated(data);
      // console.log("data from dialog component: ", data);
    });

  }

  ngOnInit() {
    this.Memos = [];

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
