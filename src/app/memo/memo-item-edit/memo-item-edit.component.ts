import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredients';
import { IngredientsModalComponent } from 'src/app/shared/ingredients-modal/ingredients-modal.component';
import { MemoServices } from 'src/app/memo/services/memo.service';
import { Memo } from '../memo.model';
@Component({
  selector: 'app-memo-item-edit',
  templateUrl: './memo-item-edit.component.html',
  styleUrls: ['./memo-item-edit.component.scss']
})
export class MemoItemEditComponent implements OnInit {

  public subscription$!: Subscription;
  public memo!: Memo;
  constructor(private dialog: MatDialog, private memoService : MemoServices) { }
  ngOnInit() {

    this.subscription$ = this.memoService.onMemoUpdated$.subscribe((memoData: Memo) => {
      this.memo = memoData;

    })
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      Ingredients: ( [] = [...this.memo.Ingredients]),
    };

    const dialogRef = this.dialog.open(IngredientsModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data === null || data === undefined) return;
        this.memo.Ingredients = [];
        this.memo.Ingredients = data as Ingredient[];
      },
      error: (error) => console.log(error),
      complete: () => console.log('completed adding new ingredients'),
    });
  }
}
