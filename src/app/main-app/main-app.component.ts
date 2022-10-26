import { Component,  Input,  NgZone, OnDestroy, OnInit } from '@angular/core';
import { Memo } from '../memo/memo.model';
import { ScrollBackUp, checkOverflow,GoBackToTopEventlistener } from '../shared/methods/methods';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MemoServices } from '../shared/services/memo.service';
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
  // page scroll features

  protected memosSubscription: Subscription | undefined;
  protected memoCreatedSubscription: Subscription | undefined;

  public IsOverflowing: boolean = false;
  public ScrollBackUp = ScrollBackUp;
  public checkOverflow = checkOverflow;
  @Input() public Memos: Memo[] = [];

<<<<<<< HEAD
  constructor(
    public authService: AuthService,
    private dialog: MatDialog,
    private ngZone: NgZone,
    public memoService: MemoServices,
    private router: Router
  ) {}
=======
  constructor(public authService: AuthService, public memoService: MemoServices, public dialog : MatDialog) { }
>>>>>>> 2e8d54683d2209dcc11ffa4d9e8365caebb3c0bd
  ngOnDestroy(): void {
    if (this.memosSubscription !== undefined) this.memosSubscription.unsubscribe();
    if (this.memoCreatedSubscription !== undefined) this.memoCreatedSubscription.unsubscribe();
    console.log('From main-app :  unsubscribed from memoArraySubcription');
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
    this.memosSubscription = this.memoService
      .GetAllMemos$()
      .subscribe((data) => {
        return data.docs.map((data) => {
          return this.Memos.push(data.data() as Memo);
        });
      });

    // sub on updated one memo
    this.memoService.onUpdateMemo$.subscribe((updatedMemo) => {
      const index = this.Memos.findIndex((memo) => {
        return memo.Id === updatedMemo.Id;
      });
      console.log('before update: ', this.Memos[index]);
      this.Memos[index] = updatedMemo;
<<<<<<< HEAD
      console.log('after update: ', this.Memos[index]);
    });

    // sub on deleted memo
    this.memoService.memoDeleted.subscribe((deletedMemo) => {
      const index = this.Memos.findIndex((memo) => {
        return memo.Id === deletedMemo.Id;
      });
      this.Memos.splice(index, 1);
=======
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
>>>>>>> 2e8d54683d2209dcc11ffa4d9e8365caebb3c0bd
    });
    // sub on created memo'
    this.memoCreatedSubscription = this.memoService.memoCreated.subscribe(
      (memo) => {
        console.log('new memo created: ', memo);
        this.Memos.push(memo);
        // this.memoCreatedSubscription.unsubscribe();
      }
    );

    console.log('current memos from /app: ', this.memoService.Memos);
  }
};
