import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.scss']
})
export class ChangeNameComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ChangeNameComponent>, @Inject(MAT_DIALOG_DATA) public data: {newName : string}) { }
  displayNameControl = new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(50)]);

  ChangeName(changeName: boolean, newName : string | null) {
    if (changeName) {
      if (newName === null) return;
      this.data.newName = newName;
      this.dialogRef.close(this.data.newName);
    } else {
      this.dialogRef.close();
    }
  }
  getDisplayNameErrorMessage() {
    if (this.displayNameControl.hasError('required')) {
      return 'Too short or too long name';
    }
    return this.displayNameControl.hasError('formTitle') ? 'Not a valid displayname' : '';
  }

  ngOnInit() {

  }

}
