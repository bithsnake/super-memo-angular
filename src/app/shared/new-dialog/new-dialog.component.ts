import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { NotificationComponent } from 'src/app/notification/notification.component';

@Component({
  selector: 'app-new-dialog',
  templateUrl: './new-dialog.component.html',
  styleUrls: ['./new-dialog.component.scss']
})
export class NewDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  public OpenNewNotificationDialog(message : string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      serverMessage: message
    }

    const dialogRef = this.dialog.open(NotificationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data === null || data === undefined) return;
      // console.log('Dialog closed');
    });

  }
  ngOnInit() {
  }

}
