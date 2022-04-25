import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<QuestionComponent>, @Inject(MAT_DIALOG_DATA) public data: {deleteAccount : boolean}) { }

  DeleteAccount(answer: boolean) {
    this.data.deleteAccount = answer;
    this.dialogRef.close(this.data.deleteAccount);
  }
  ngOnInit() {
  }

}
