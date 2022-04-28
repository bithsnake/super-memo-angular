import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { QuestionComponent } from 'src/app/question/question.component';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { ChangeNameComponent } from 'src/app/change-name/change-name.component';
import { authState } from '@angular/fire/auth';
import { UrlService } from 'src/app/shared/url.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
interface DeleteQuestion {
  deleteItem : boolean
}
export class YesNoQuestion implements DeleteQuestion {
  deleteItem: boolean;
  constructor() {
    this.deleteItem = false;
  }
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  color = {
    red: 'rgba(255,148,148)',
    green: 'rgb(72, 245, 66)'
  };
  constructor(public authService: AuthService, public dialog: MatDialog, private urlService : UrlService, private router: Router) {}

  public OpenDeleteAccountDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data  = {
      deleteItem: false,
      message : 'Are you sure you want to delete your account?'
    }

    const dialogRef = this.dialog.open(QuestionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data : YesNoQuestion) => {
      console.log("data from dialog component: ", data);
      if (data) {
        // console.log("Deleting account");
        this.authService.afAuth.currentUser.then(user => {
          if (user === null || user === undefined) {
            window.alert("there is no user to delete, perhaps you have resetted the localstorage: ")
            return;
          }
          user.delete().then(next => {
            this.authService.SignOut();
          }).catch(error => {
            window.alert("Could not delete acount: " + error);
          })
        }).catch(error => {
          window.alert(error);
        })
      }
    });
  }
  public OpenChangeDisplayNameDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data  = {
      deleteAccount: false,
    }

    const dialogRef = this.dialog.open(ChangeNameComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data : string) => {
      console.log("data from dialog component: ", data);
      if (data) {
        // console.log("Deleting account");
        this.authService.afAuth.currentUser.then(user => {

          if (user === null || user === undefined) {
            window.alert("there is no user to delete, perhaps you have resetted the localstorage: ")
            return;
          }

          user.updateProfile({
            displayName : data
          })

        }).catch(error => {
          window.alert(error);
        })
      }
    });
  }
  public GoBack() {
    this.urlService.GoBack();
  }

  ngOnInit(): void { }
}
