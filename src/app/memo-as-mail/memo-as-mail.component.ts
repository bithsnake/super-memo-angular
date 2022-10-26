import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Memo } from '../memo/memo.model';
import { Ingredient } from '../shared/ingredients';
import { NewDialogComponent } from '../shared/new-dialog/new-dialog.component';

@Component({
  selector: 'app-memo-as-mail',
  templateUrl: './memo-as-mail.component.html',
  styleUrls: ['./memo-as-mail.component.scss']
})
export class MemoAsMailComponent implements OnInit {

  public emailAddressControl = new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(30)]);
  public messageControl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(147)]);
  public ingredients: Ingredient[] = [];
  public title: string;
  public description: string
  public date: Date;

  constructor(private dialog: MatDialog,private dialogRef: MatDialogRef<MemoAsMailComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.memo.title as string;
    this.description = data.memo.description as string;
    this.date = data.memo.CreatedDate as Date;
    const ingredients = (this.data.memo as Memo).Ingredients;
    if (ingredients === null || ingredients === undefined) return;
    this.ingredients = ingredients;
  }

  ngOnInit() {
    this.title = this.data.memo.Title;
    this.description =this. data.memo.Description;
    this.date = this.data.memo.CreatedDate as Date;
    const ingredients = (this.data.memo as Memo).Ingredients;
    if (ingredients === null || ingredients === undefined) return;
    this.ingredients = ingredients;
  }


  SendMessage() {

    const newData = {
      data: this.data.memo as Memo,
      email : this.emailAddressControl.value,
      message : this.messageControl.value
    }
    this.dialog.afterAllClosed.subscribe(data => {
      console.log("this modal has been closed");
    })

    this.dialogRef.close(newData.email === undefined ? newData.email = '' : newData.email);
  }
  getEmailAddressErrorMessage() {
    if (this.emailAddressControl.hasError('required')) {
      return 'A mailaAddress required.';
    }
    return this.emailAddressControl.hasError('formTitle') ? 'Not a valid mailaddress' : '';
  }
  getMessageErrorMessage() {
    if (this.messageControl.hasError('required')) {
      return 'Too short or long message.';
    }
    return this.messageControl.hasError('formDescription') ? 'Not a valid message' : '';
  }

  Cancel() {
    this.dialogRef.close();
  }
}
