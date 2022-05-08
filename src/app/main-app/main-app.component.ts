import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Memo } from '../memo/memo.model';
import { ScrollBackUp, checkOverflow, compareName, compareId, compareCreatedDate, PrevScrollY } from '../methods/methods';
import { Ingredient } from '../shared/ingredients';
import { AuthService } from '../shared/services/auth.service';
import { NewDialogComponent } from '../shared/new-dialog/new-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FirebaseError } from 'firebase/app';
import { AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { QuestionComponent } from '../question/question.component';
import { YesNoQuestion } from '../management/dashboard/dashboard.component';
PrevScrollY();
@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit {
  public title = 'super-memo-angular';
  public isSignedin: boolean = false;
  public showAllComponents : boolean  = false;
  @Input() public currentActiveMemoIndex: number = -1;
  private memosCollection: AngularFirestoreCollection<Memo>;
  memoObservable: Observable<Memo[]>;
  public Memos: Memo[];

  public UseRow: boolean = true;
  public IsOverflowing: boolean = false;
  public ScrollBackUp = ScrollBackUp;
  public checkOverflow = checkOverflow;

  constructor(public authService: AuthService, private dialog: MatDialog, private ngZone: NgZone, ) {
    this.Memos = [];

    this.memosCollection = this.authService.afs.collection<Memo>(`users/${this.authService.userData.uid}/memos`);

    this.memoObservable = this.memosCollection.stateChanges(['added']).pipe(
      map(actions => {
        const data = actions.map(x => x.payload.doc.data() as Memo)
        this.Memos = data;
        return data;
      })
    );

  };

  ngOnInit(): void {
    if (sessionStorage.getItem('user') !== null) {
      this.isSignedin = true;
    } else {
      this.isSignedin = false;
    };
    this.Memos = [];
    this.GetMemos().then(() => {
      this.showAllComponents = true;
    }).catch(error => {
      console.log("error getting memos from db: ", error)
    });
    this.memoObservable.subscribe(change => {
      this.GetMemos().catch(error => {
        const e = error as FirebaseError;
        new NewDialogComponent(this.dialog).OpenNewNotificationDialog('An error occured when fetching memos from the database, error message reported to the support department: ' +  e.message);
      });
    })
  }
  async onSignUp(email: string, password: string) {
    await this.authService.SignUp(email, password);
    if (this.authService.isLoggedIn) {
      this.isSignedin = true;
    }
  }
  async onSignIn(email: string, password: string) {
    await this.authService.SignIn(email, password);
    if (this.authService.isLoggedIn) {
      this.isSignedin = true;
    }
  }

  handlerLogOut() {
    this.isSignedin = false;
  }

  public CheckMemoItem(e: Event) {
    const _e = (e.currentTarget as HTMLElement);
    _e.classList.add('rotate-element');
  }

  public async AddNewMemoToList(newMemo: Memo) {
    try {
      let addedMemo : DocumentReference<unknown>;
      await this.authService.afs.collection(`users/${this.authService.userData.uid}/memos`).add(
        {
          Id: newMemo.Id,
          Title: newMemo.Title,
          Description: newMemo.Description,
          CreatedDate: newMemo.CreatedDate,
          MemoIcon: newMemo.MemoIcon,
          Ingredients: []
        }
        ).then(x => {
          addedMemo = x;
          addedMemo.update({
            Id: x.id,
            Index : this.Memos.length + 1
          })
          newMemo.Id = x.id;

        for (let i = 0; i < newMemo.Ingredients.length; i++) {
          const ingredient = newMemo.Ingredients[i];
           addedMemo.update({
            Ingredients: firebase.firestore.FieldValue.arrayUnion({
              Name: ingredient.Name,
              Icon: ingredient.Icon,
              Amount: ingredient.Amount
            })
          }).catch(error => {
            const e = error as FirebaseError;
            throw new Error(`${e}`);
          })
        }
        }).then(() => {
          new NewDialogComponent(this.dialog).OpenNewNotificationDialog('A memo was added!');
          this.GetMemos();
      }).catch(error => {
        const e = error as FirebaseError;
        new NewDialogComponent(this.dialog).OpenNewNotificationDialog('An error occured when creating a memo, error message reported to the support department: ' +  e.message);
      });
    } catch (error) {
      let e = error as FirebaseError;
      new NewDialogComponent(this.dialog).OpenNewNotificationDialog('An error occured when creating a memo, error message reported to the support department: ' +  e.message);
    }
  };

  public OpenDeleteMemoDialog(deleteMemo : Memo) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      deleteItem: false,
      message: 'Are you sure you want to delete this memo item?',
    };

    const dialogRef = this.dialog.open(QuestionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data : YesNoQuestion) => {
      if (data) {
        try {
            this.authService.afs.collection('users').doc(this.authService.userData.uid).collection('memos').doc(deleteMemo.Id).delete().then(() => {
              this.GetMemos();
            }).catch(error => {
              const e = error as FirebaseError;
              console.log("error: ", e);
            })
        } catch (error) {
          let e = error as FirebaseError;
          new NewDialogComponent(this.dialog).OpenNewNotificationDialog('Something went wrong deleting an memp item\n' + e.message);
        };
      };
    });
  };

  public OrderMemosByLetter = () => this.Memos.sort(compareName);
  public OrderMemosByID = () => this.Memos.sort(compareId);
  public OrderMemosByCreated = () => this.Memos.sort(compareCreatedDate);

  public ToggleMemosFlexFlow(BackToTopElement: HTMLElement, ItemListElement : HTMLElement) {
    this.UseRow = !this.UseRow;
    this.IsOverflowing = this.checkOverflow(BackToTopElement,ItemListElement);
  }

  public drop(event : CdkDragDrop<Ingredient[]>) {
    moveItemInArray(this.Memos, event.previousIndex, event.currentIndex);
  }

  public ResetCurrentMemoIndexOnAll(memo : Memo) {
    this.currentActiveMemoIndex = -1;
  }
  public CheckCurrentMemoIndex(checkThisMemo: Memo) {
    if (checkThisMemo === null || checkThisMemo === undefined) return;
    const currentIndex = this.Memos.indexOf(checkThisMemo, 0);
    this.currentActiveMemoIndex = currentIndex;
  }

  public async GetMemos() {
    const newMemos = await this.authService.GetAllMemos();
    if (newMemos !== null || newMemos !== undefined) {
      this.Memos = newMemos;
    }
  }
};
