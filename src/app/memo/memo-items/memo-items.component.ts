import { Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMemo } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MemoMapperService } from 'src/app/shared/services/memo-mapper.service';
import { MemoServices } from 'src/app/shared/services/memo.service';
import { Memo } from '../memo.model';

@Component({
  selector: 'app-memo-items',
  templateUrl: './memo-items.component.html',
  styleUrls: ['./memo-items.component.scss'],
})
export class MemoItemsComponent implements OnInit, OnDestroy {
  @Output() memosUpdated: EventEmitter<Memo> = new EventEmitter<Memo>();
  public showMemos: Subscription | boolean = false;
  public deletedMemo!: Subscription;
  protected myIntervall: NodeJS.Timeout | undefined;

  @Output() public staticMemoList: Memo[] = [];
  public Memos$!: Observable<Memo[]>;
  constructor(public authService: AuthService, public memoService: MemoServices) {}

  ngOnDestroy(): void {
    if (this.myIntervall !== undefined) clearInterval(this.myIntervall);
  }

  ngOnInit(): void {

    this.Memos$ = this.memoService.GetMemos();

    //TODO: Delete later if you are not going to use ordering
    this.showMemos = this.memoService.GetMemos().subscribe({
      next: (memoData) => {
        this.staticMemoList = memoData as Memo[]
      },
      complete: () => {return true}
    })
    this.myIntervall = setInterval(() => {
      document.getElementById('nomemos')?.classList.toggle('shake-text');
    }, 2500);
  }
}
