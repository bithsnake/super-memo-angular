import { Component,  NgZone, OnDestroy, OnInit } from '@angular/core';
import { Memo } from '../memo/memo.model';
import { ScrollBackUp, checkOverflow,PrevScrollY } from '../methods/methods';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
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
  public Memos: Memo[] = [];

  constructor(public authService: AuthService, private dialog: MatDialog, private ngZone: NgZone, public memoService: MemoServices, private router : Router) { }
  ngOnDestroy(): void {
    this.memosSubscription.unsubscribe();
    this.memoService.showAllComponents = false;
    console.log("unsubscribed from memoArraySubcription");
  }

  public ToggleMemosFlexFlow(BackToTopElement: HTMLElement, ItemListElement : HTMLElement) {
    this.UseRow = !this.UseRow;
    this.IsOverflowing = this.checkOverflow(BackToTopElement, ItemListElement);
  }


  ngOnInit(): void {
    this.memosSubscription = this.authService.GetAllMemos().subscribe(
      {
        next: (data) => data.docs.map((memoArray) => memoArray.data()).forEach(data => {
          this.Memos.push(data as Memo);
          console.log("Current memos: ", this.Memos);

        }),
        error: (error) => { new NewDialogComponent(this.dialog).OpenNewNotificationDialog(`Something went wrong getting memos: ${error}`) },
        complete: () => {
          this.memoService.showAllComponents = true;
          console.log("completed the stream")
        }
      }
    );
    setInterval(() => {
      document.getElementById('nomemos')?.classList.toggle('shake-text');
    }, 4000);
    console.log("current memos from /app: ", this.Memos);

  }

};
