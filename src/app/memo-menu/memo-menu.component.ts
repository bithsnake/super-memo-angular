import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import AddNewMemoComponent from '../memo/add-new-memo/add-new-memo.component';
import { MemoIcons } from '../memo/memo-icons/memo-icons';
import { Memo } from '../memo/memo.model';
import { NewDialogComponent } from '../shared/new-dialog/new-dialog.component';
import { MemoServices } from '../shared/services/memo.service';
@Component({
  selector: 'app-memo-menu',
  templateUrl: './memo-menu.component.html',
  styleUrls: ['./memo-menu.component.scss']
})
export class MemoMenuComponent implements OnInit,OnDestroy {
  @Input() Memos!: Memo[];
  private memoCreatedSubscription!: Subscription;
  private memosChangedSubscription!: Subscription;
  private memosDeletedSubscription!: Subscription;
  private memosSubscription!: Subscription;
  constructor(public dialog: MatDialog, public memoService: MemoServices) { }

  ngOnInit() {
    this.Memos = [];

  }

  ngOnDestroy(): void {
    if (this.memosSubscription !== undefined) this.memosSubscription.unsubscribe();
    if (this.memoCreatedSubscription !== undefined) this.memoCreatedSubscription.unsubscribe();
    if (this.memosChangedSubscription !== undefined) this.memosChangedSubscription.unsubscribe();
    if (this.memosDeletedSubscription !== undefined) this.memosChangedSubscription.unsubscribe();
    console.log("From memo-menu : unsubscribed from memoArraySubcription");

  }

  OrderMemosByLetter = () => this.memoService.orderMemosByLetter.emit(true);
  OrderMemosByID = () => this.memoService.orderMemosByID.emit(true);
  OrderMemosByCreated = () => this.memoService.orderMemosByCreated.emit(true);
  StackMemos = () => this.memoService.stackMemos.emit();



  public OpenNewMemoDialog() {
    const dialogConfig = new MatDialogConfig();
    // data
    dialogConfig.data = {
      Id: '',
      Title: '',
      Description: '',
      CreatedDate: new Date(),
      MemoIcon: MemoIcons.memo,
      Ingredients: [],
    };
    // set dialog box maxheight
    dialogConfig.maxHeight = "64rem";

    const dialogRef = this.dialog.open(AddNewMemoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next: (newMemoData) => {
        if (newMemoData === null || newMemoData === undefined) return;
        this.memoService.AddNewMemoToList(newMemoData as Memo);
      },
      error: (error) => {
        console.error("Could not add a new memo" , error);
      },
      complete: () => console.log("new memo created, sent data to memo.service.ts")
    });

    // memo updated
    this.memosChangedSubscription = this.memoService.onMemoUpdated$.subscribe((updatedMemo) => {
      const index = this.Memos.findIndex((memo) => {
        return memo.Id === updatedMemo.Id;
      });
      this.Memos[index] = updatedMemo;
    });

    // memo deleted
    this.memosDeletedSubscription = this.memoService.onMemoDeleted$.subscribe((deletedMemo) => {
      const index = this.Memos.findIndex((memo) => {
        return memo.Id === deletedMemo.Id;
      });
      this.Memos.splice(index, 1);
    });

    // created a new memo
    this.memoCreatedSubscription = this.memoService.onNewMemoCreated$.subscribe(
      (memo) => {
        this.Memos.push(memo);
      }
    );

  }

}
