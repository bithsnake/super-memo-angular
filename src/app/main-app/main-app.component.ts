import { Component,  Input,  NgZone, OnDestroy, OnInit } from '@angular/core';
import { Memo } from '../memo/memo.model';
import { ScrollBackUp, checkOverflow,GoBackToTopEventlistener } from '../shared/methods/methods';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MemoServices } from '../memo/services/memo.service';
import { Subscription, } from 'rxjs';
import { NewDialogComponent } from '../shared/new-dialog/new-dialog.component';
import { Router } from '@angular/router';

GoBackToTopEventlistener();

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent implements OnInit, OnDestroy {
  // switch between row and col (css)
  public UseRow: boolean = true;
  private memosSubscription: Subscription | undefined;
  private memoCreatedSubscription: Subscription | undefined;
  public IsOverflowing: boolean = false;
  public ScrollBackUp = ScrollBackUp;
  public checkOverflow = checkOverflow;
  @Input() public Memos: Memo[] = [];

  constructor(public authService: AuthService,public memoService: MemoServices,) {}
  ngOnDestroy(): void {
    // if (this.memosSubscription !== undefined) this.memosSubscription.unsubscribe();
    // if (this.memoCreatedSubscription !== undefined) this.memoCreatedSubscription.unsubscribe();
    // console.log('From main-app :  unsubscribed from memoArraySubcription');
  }

  public ToggleMemosFlexFlow(
    BackToTopElement: HTMLElement,
    ItemListElement: HTMLElement
  ) {
    this.UseRow = !this.UseRow;
    this.IsOverflowing = this.checkOverflow(BackToTopElement, ItemListElement);
  }

  ngOnInit(): void {

    //initial memos get, sub on observable
    // this.memosSubscription = this.memoService
    //   .GetAllMemos$()
    //   .subscribe((data) => {
    //     return data.docs.map((data) => {
    //       return this.Memos.push(data.data() as Memo);
    //     });
    //   });

    // sub on updated one memo

    // this.memoService.onUpdateMemo$.subscribe((updatedMemo) => {
    //   const index = this.Memos.findIndex((memo) => {
    //     return memo.Id === updatedMemo.Id;
    //   });
    //   console.log('before update: ', this.Memos[index]);
    //   this.Memos[index] = updatedMemo;
    //   console.log('after update: ', this.Memos[index]);
    // });

    // // sub on deleted memo
    // this.memoService.onMemoDeleted$.subscribe((deletedMemo) => {
    //   const index = this.Memos.findIndex((memo) => {
    //     return memo.Id === deletedMemo.Id;
    //   });
    //   this.Memos.splice(index, 1);
    // });
    // // sub on created memo'
    // this.memoCreatedSubscription = this.memoService.memoCreated.subscribe(
    //   (memo) => {
    //     console.log('new memo created: ', memo);
    //     this.Memos.push(memo);
    //     // this.memoCreatedSubscription.unsubscribe();
    //   }
    // );
  }
};
