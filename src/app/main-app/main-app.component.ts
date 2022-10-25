import { Component,  NgZone, OnDestroy, OnInit } from '@angular/core';
import { Memo } from '../memo/memo.model';
import { ScrollBackUp, checkOverflow,PrevScrollY } from '../shared/methods/methods';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MemoServices } from '../shared/services/memo.service';
import { Subscription } from 'rxjs';
import { NewDialogComponent } from '../shared/new-dialog/new-dialog.component';
import { Router } from '@angular/router';
PrevScrollY();

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})

export class MainAppComponent implements OnInit, OnDestroy {
  // switch between row and col (css)
  public UseRow: boolean = true;
  // page scroll features
  public IsOverflowing: boolean = false;
  public ScrollBackUp = ScrollBackUp;
  public checkOverflow = checkOverflow;
  protected memosSubscription!: Subscription;
  protected memoCreatedSubscription!: Subscription;
  public Memos: Memo[] = [];

  constructor(public authService: AuthService, public memoService: MemoServices, public dialog : MatDialog) { }
  ngOnDestroy(): void {
    this.memosSubscription.unsubscribe();
    this.memoCreatedSubscription.unsubscribe();
    this.memoService.showAllComponents = true;
    console.log("unsubscribed from memoArraySubcription");
  }

  public ToggleMemosFlexFlow(BackToTopElement: HTMLElement, ItemListElement : HTMLElement) {
    this.UseRow = !this.UseRow;
    this.IsOverflowing = this.checkOverflow(BackToTopElement, ItemListElement);
  }


  ngOnInit(): void {
    //initial memos get, sub on observable
    this.GetMemos();

    this.memoService.onUpdateMemo.subscribe(updatedMemo => {
      const index = this.Memos.findIndex(memo => { return memo.Id === updatedMemo.Id });
      console.log("before update: " , this.Memos[index]);
      this.Memos[index] = updatedMemo;
      console.log("after update: " , this.Memos[index]);
    })
    
    this.memoService.memoDeleted.subscribe(deletedMemo => {
      const index = this.Memos.findIndex(memo => { return memo.Id === deletedMemo.Id });
      this.Memos.splice(index, 1);

    })
    this.memoCreatedSubscription = this.memoService.memoCreated.subscribe(memo => {
      this.Memos.push(memo);
    })

    setInterval(() => {
      document.getElementById('nomemos')?.classList.toggle('shake-text');
    }, 4000);
    console.log("current memos from /app: ", this.memoService.Memos);

  }

  public GetMemos() : void {
    this.memosSubscription = this.authService.GetAllMemos$().subscribe(
      {
       next :  (data) => data.docs.map((memoArray) => memoArray.data()).forEach(data => {
          this.Memos.push(data as Memo);
          console.log("Current memos locally: ", this.Memos);
          console.log("Current memos from service: ", this.memoService.Memos);
       }),
        complete: () => {
          this.memoService.showAllComponents = true;
          console.log('completed downloading the memos')
        },
        error : (error) => {
          new NewDialogComponent(this.dialog).OpenNewNotificationDialog('An error occured when fetching memos: ' +  error);
        }
    });
  }
};
