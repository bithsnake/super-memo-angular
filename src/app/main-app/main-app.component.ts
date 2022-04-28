import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, NgZone, OnInit, Output } from '@angular/core';
import { MemoIcons } from '../memo/memo-icons/memo-icons';
import { Memo } from '../memo/memo.model';
import { ScrollBackUp, checkOverflow, compareName, compareId, compareCreatedDate, PrevScrollY } from '../methods/methods';
import { Ingredient, ingredients } from '../shared/ingredients';
import { AuthService } from '../shared/services/auth.service';
import * as uuid from 'uuid';
import { NewDialogComponent } from '../shared/new-dialog/new-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { FirebaseError } from 'firebase/app';
import { FieldValue, QueryDocumentSnapshot } from 'firebase/firestore';
import { AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { onAuthStateChanged } from 'firebase/auth';
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
  title = 'super-memo-angular';
  public isSignedin: boolean = false;
  @Input() public currentActiveMemoIndex: number = -1;
  private memosCollection: AngularFirestoreCollection<Memo>;
  memoObservable: Observable<Memo[]>;
  public Memos: Memo[] = [];

  constructor(public authService: AuthService, private dialog: MatDialog, private ngZone: NgZone) {
    this.memosCollection = this.authService.afs.collection<Memo>(`users/${this.authService.userData.uid}/memos`);
    this.memoObservable = this.memosCollection.stateChanges(['added']).pipe(
      map(actions => {
        const data = actions.map(x => x.payload.doc.data() as Memo)
        this.Memos = data;
        return data;
      })
    )

  }
  ngOnInit(): void {
    if (sessionStorage.getItem('user') !== null) {
      this.isSignedin = true;
    } else {
      this.isSignedin = false;
    };
    this.Memos = [];
    this.GetMemos().catch(error => {
      console.log("error getting memos from db: ", error)
    });
    this.memoObservable.subscribe(change => {
      console.log("change happened: ", change);

      this.GetMemos().catch(error => {
        console.log("error getting memos from db: ", error)
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
  public UseRow: boolean = true;
  public IsOverflowing: boolean = false;
  public ScrollBackUp = ScrollBackUp;
  public checkOverflow = checkOverflow;


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
          // this.Memos.push(newMemo);
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
            console.log("error: ", e.message);
          })

        }
        }).then(() => {
          this.GetMemos();
      }).catch(error => {
        const e = error as FirebaseError;
        console.log("from AddNewMemoToList adding memo: ", e.message);
      });
    } catch (error) {
      let e = error as FirebaseError;
      console.log("Error creating new memo: ", e.message);
    }
  }
  public OpenDeleteMemoDialog(deleteMemo : Memo) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      deleteItem: false,
      message : 'Are you sure you want to delete this memo item?',
    }

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

        }
      }
    });
  }
  // delete later or use for local mockup
  public RemoveMemo(memo: Memo) {
    // const objectIndex = this.Memos.indexOf(memo, 0);
    // this.Memos.splice(objectIndex, 1);
    try {
      // const snapShot = this.authService.afs.collection(`users`).doc(this.authService.userData.uid).collection('memos').doc(this.memo.Id).get().subscribe(data => {
        this.authService.afs.collection('users').doc(this.authService.userData.uid).collection('memos').doc(memo.Id).delete().then(() => {
          this.GetMemos();
        }).catch(error => {
          const e = error as FirebaseError;
          console.log("error: ", e);
        })
      // })
      // snapShot.closed = true;
    } catch (error) {
      let e = error as FirebaseError;
      console.log("Error creating new memo: ", e.message);
    }
  }
  public EditMemo(currentMemo : Memo) {
    console.log("value in edit button: ", currentMemo);
  }

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
      console.log("update memos: ", newMemos);
      console.log("this.Memos: ", this.Memos);
    }
  }
}
