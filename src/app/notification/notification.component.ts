import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  public message: string = '';
  constructor(private dialogRef: MatDialogRef<NotificationComponent>, @Inject(MAT_DIALOG_DATA) public data: { serverMessage: string }, public authService: AuthService) {
    this.message = data.serverMessage;
  }
  public CloseNotification() {
    this.dialogRef.close();
  };

  ngOnInit() {
    this.message = this.data.serverMessage;
  };
}
