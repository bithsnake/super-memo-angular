import { Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChildActivationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MemoServices } from 'src/app/shared/services/memo.service';
import { Memo } from '../memo.model';

@Component({
  selector: 'app-memo-items',
  templateUrl: './memo-items.component.html',
  styleUrls: ['./memo-items.component.scss'],
})
export class MemoItemsComponent implements OnInit, OnDestroy {
  @Output() memosUpdated: EventEmitter<Memo> = new EventEmitter<Memo>();
  protected memosSubscription: Subscription | undefined;
  protected memoCreatedSubscription: Subscription | undefined;;
  protected memosChangedSubscription: Subscription | undefined;;
  protected myIntervall: NodeJS.Timeout | undefined;
  public memosChanged$!: Observable<Memo[]>;
  public showComponents: boolean = false;
  public Memos: Memo[] = [];

  constructor(
    public authService: AuthService,
    private dialog: MatDialog,
    private ngZone: NgZone,
    public memoService: MemoServices,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    if (this.myIntervall !== undefined) clearInterval(this.myIntervall);
    if (this.memosSubscription !== undefined) this.memosSubscription.unsubscribe();
    if (this.memoCreatedSubscription !== undefined) this.memoCreatedSubscription.unsubscribe();
    if (this.memosChangedSubscription !== undefined) this.memosChangedSubscription.unsubscribe();
    console.log("unsubscribed from memoArraySubcription");
  }

  ngOnInit() {
    // get memos
    this.Memos = [];

    this.memosSubscription = this.memoService
      .GetAllMemos$()
      .subscribe({

        next: (collection) => {
          collection.docs.map(
            (data) => {
              this.Memos.push(data.data() as Memo)
            })
        },
        error: () => { },
        complete: () => {
          this.showComponents = true;
        }
      });

    console.log('authService: ', this.authService);

    // memo updated
    this.memoService.onUpdateMemo$.subscribe((updatedMemo) => {
      const index = this.Memos.findIndex((memo) => {
        return memo.Id === updatedMemo.Id;
      });
      console.log('before update: ', this.Memos[index]);
      this.Memos[index] = updatedMemo;
      console.log('after update: ', this.Memos[index]);
    });

    // memo deleted
    this.memoService.memoDeleted.subscribe((deletedMemo) => {
      const index = this.Memos.findIndex((memo) => {
        return memo.Id === deletedMemo.Id;
      });
      this.Memos.splice(index, 1);
    });

    // created a new memo
    this.memoCreatedSubscription = this.memoService.memoCreated.subscribe(
      (memo) => {
        console.log('new memo created: ', memo);
        this.Memos.push(memo);
        // this.memoCreatedSubscription.unsubscribe();
      }
    );

    this.myIntervall = setInterval(() => {
      document.getElementById('nomemos')?.classList.toggle('shake-text');
    }, 2500);
  }
}
