import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  public message: string = 'Are you sure you want to delete your account?';
  constructor(
    private dialogRef: MatDialogRef<QuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { deleteItem: boolean, message : string },

  ) {
    this.message = data.message;
  }

  DeleteAccount(answer: boolean) {
    this.data.deleteItem = answer;
    this.dialogRef.close(this.data.deleteItem);
  }

}
