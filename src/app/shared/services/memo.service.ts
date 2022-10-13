import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FirebaseError } from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { YesNoQuestion } from 'src/app/management/dashboard/dashboard.component';
import { Memo } from 'src/app/memo/memo.model';
import { ScrollBackUp, checkOverflow, compareName, compareId, compareCreatedDate } from 'src/app/methods/methods';
import { QuestionComponent } from 'src/app/question/question.component';
import { Ingredient } from '../ingredients';
import { NewDialogComponent } from '../new-dialog/new-dialog.component';
import { AuthService } from './auth.service';
import { AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';



@Injectable({
  providedIn: 'root'
})
export class MemoServices {
  public memoCreated: EventEmitter<Memo> = new EventEmitter;
  public orderMemosByLetter: EventEmitter<Boolean> = new EventEmitter;
  public orderMemosByID: EventEmitter<Boolean> = new EventEmitter;
  public orderMemosByCreated: EventEmitter<Boolean> = new EventEmitter;
  public stackMemos: EventEmitter<Boolean> = new EventEmitter;
  public memoDeleted: EventEmitter<Memo> = new EventEmitter();
  public sendMemoAsMail: EventEmitter<Memo> = new EventEmitter();
  public onMemoClicked: EventEmitter<Memo> = new EventEmitter();
  public onUpdateMemo: EventEmitter<Memo> = new EventEmitter();
  public onResetCurrentMemoIndexOnAll: EventEmitter<Memo> = new EventEmitter();
  public title = 'super-memo-angular';
  public isSignedin: boolean = false;
  public showAllComponents : boolean  = false;
  private memosCollection: AngularFirestoreCollection<Memo>;
  public currentActiveMemoIndex: number = -1;
  public memoObservable: Observable<Memo[]>;
  public Memos: Memo[];
  public UseRow: boolean = false;

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


public drop(event : CdkDragDrop<Ingredient[]>) : void {
  moveItemInArray(this.Memos, event.previousIndex, event.currentIndex);
}

public ResetCurrentMemoIndexOnAll(memo : Memo) : void {
  this.currentActiveMemoIndex = -1;
}
public CheckCurrentMemoIndex(checkThisMemo: Memo) : void {
  if (checkThisMemo === null || checkThisMemo === undefined) return;
  const currentIndex = this.Memos.indexOf(checkThisMemo, 0);
  this.currentActiveMemoIndex = currentIndex;
}

  public UpgradeCurrentMemoIngredients(currentMemo : Memo) : string {
    try {
      let memo = this.authService.afs.collection('users').doc(this.authService.userData.uid).collection('memos').doc(currentMemo.Id);

      const isfound = memo.get().subscribe(data => {
        // const memoOnDb = data.data() as Memo;
        console.log("data: ", data);
        console.log("data: ", data);

        memo.set(
          {
            Id: currentMemo.Id,
            Index: currentMemo.Index,
            Title: currentMemo.Title,
            Description: currentMemo.Description,
            CreatedDate: currentMemo.CreatedDate,
            Ingredients: currentMemo.Ingredients
          }, {
            merge : true
          }
        );
        isfound.closed = true;
        return String(currentMemo.CreatedDate.toLocaleDateString());
      });

      if (isfound.closed) {
        this.onUpdateMemo.emit();
      }

    } catch (error) {
      let e = error as FirebaseError;
      new NewDialogComponent(this.dialog).OpenNewNotificationDialog('Something went wrong updating this memo item\n' + e.message);
    }
    return String(currentMemo.CreatedDate.toLocaleDateString());
  }

public async GetMemos(): Promise<Memo[]> {
    const currentMemos = await this.authService.GetAllMemos().subscribe(data => data.docs.map(data => data.data() as Memo[])) as unknown as Promise<Memo[]>;
  try {
  } catch (error) {
    new NewDialogComponent(this.dialog).OpenNewNotificationDialog('Could not retreive memos, call support 010-0000000');
  }
    return currentMemos;
}
// public async GetMemos(): Observable<Memo[]> {
//   //   const currentMemos = await this.authService.GetAllMemos() as Promise<Memo[]>;
//   // try {
//   // } catch (error) {
//   //   new NewDialogComponent(this.dialog).OpenNewNotificationDialog('Could not retreive memos, call support 010-0000000');
//   // }
//   //   return currentMemos;
// }
}
