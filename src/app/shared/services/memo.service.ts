import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FirebaseError } from 'firebase/app';
<<<<<<< HEAD
import { BehaviorSubject, defer, from, Observable, Subject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
=======
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
>>>>>>> 2e8d54683d2209dcc11ffa4d9e8365caebb3c0bd
import { YesNoQuestion } from 'src/app/management/dashboard/dashboard.component';
import { Memo } from 'src/app/memo/memo.model';
import { ScrollBackUp, checkOverflow, compareName, compareId, compareCreatedDate } from 'src/app/shared/methods/methods';
import { QuestionComponent } from 'src/app/question/question.component';
import { Ingredient } from '../ingredients';
import { NewDialogComponent } from '../new-dialog/new-dialog.component';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection, DocumentData, DocumentReference, QuerySnapshot } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UrlService } from '../url.service';
import { User } from './user';
import { user } from '@angular/fire/auth';





@Injectable({
  providedIn: 'root'
})
export class MemoServices {
  public memoCreated: Subject<Memo> = new Subject();
  public onUpdateMemo$: Subject<Memo> = new Subject();
  public memoCreatedSubscrition!: Subscription;


  public orderMemosByLetter: EventEmitter<Boolean> = new EventEmitter;
  public orderMemosByID: EventEmitter<Boolean> = new EventEmitter;
  public orderMemosByCreated: EventEmitter<Boolean> = new EventEmitter;
  public stackMemos: EventEmitter<Boolean> = new EventEmitter;
  public memoDeleted: EventEmitter<Memo> = new EventEmitter();
  public sendMemoAsMail: BehaviorSubject<Memo> = new BehaviorSubject(new Memo());
  public onMemoClicked: EventEmitter<Memo> = new EventEmitter();
<<<<<<< HEAD
=======
  public onUpdateMemo: BehaviorSubject<Memo> = new BehaviorSubject(new Memo());
>>>>>>> 2e8d54683d2209dcc11ffa4d9e8365caebb3c0bd
  public onResetCurrentMemoIndexOnAll: EventEmitter<Memo> = new EventEmitter();


  public title = 'super-memo-angular';
  public isSignedin: boolean = false;
  public showAllComponents: boolean = false;
  public memosCollection!: AngularFirestoreCollection<Memo>;
  public currentActiveMemoIndex: number = -1;

  public Memos: Memo[];
  public UseRow: boolean = false;

  constructor(
    public authService: AuthService,
    private dialog: MatDialog,
    private ngZone: NgZone,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth servce
    public router: Router,
    public urlService: UrlService,
  ) {
    this.Memos = [];

    if (this.authService.userData.uid !== '') {
      this.memosCollection = this.authService.afs.collection<Memo>(`users/${this.authService.userData.uid}/memos`);
      // console.log("this.memosCollection: ", this.memosCollection);
    }

  };

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
      let addedMemo: DocumentReference<unknown>;
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
          Index: this.Memos.length + 1
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
        // emit
        this.memoCreated.next(newMemo);
      }).catch(error => {
        const e = error as FirebaseError;
        new NewDialogComponent(this.dialog).OpenNewNotificationDialog('An error occured when creating a memo, error message reported to the support department: ' + e.message);
      });
    } catch (error) {
      let e = error as FirebaseError;
      new NewDialogComponent(this.dialog).OpenNewNotificationDialog('An error occured when creating a memo, error message reported to the support department: ' + e.message);
    }
  };

  public OpenDeleteMemoDialog(deleteMemo: Memo) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      deleteItem: false,
      message: 'Are you sure you want to delete this memo item?',
    };

    const dialogRef = this.dialog.open(QuestionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data: YesNoQuestion) => {
      if (data) {
        try {
          this.authService.afs.collection('users').doc(this.authService.userData.uid).collection('memos').doc(deleteMemo.Id).delete().then(() => {
            this.memoDeleted.emit(deleteMemo);
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

  /**Cdk draw n drop ingredient, this drops an ingredient from one index to another */
  public drop(event: CdkDragDrop<Ingredient[]>): void {
    moveItemInArray(this.Memos, event.previousIndex, event.currentIndex);
  }

  public ResetCurrentMemoIndexOnAll(memo: Memo): void {
    this.currentActiveMemoIndex = -1;
  }
  public CheckCurrentMemoIndex(checkThisMemo: Memo): void {
    if (checkThisMemo === null || checkThisMemo === undefined) return;
    const currentIndex = this.Memos.indexOf(checkThisMemo, 0);
    this.currentActiveMemoIndex = currentIndex;
  }

  public UpgradeCurrentMemoIngredients(currentMemo: Memo): string {
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
          merge: true
        }
        );
        isfound.closed = true;
        return String(currentMemo.CreatedDate.toLocaleDateString());
      });

      if (isfound.closed) {
<<<<<<< HEAD
        this.onUpdateMemo$.next(currentMemo);
=======
        this.onUpdateMemo.next(currentMemo);
>>>>>>> 2e8d54683d2209dcc11ffa4d9e8365caebb3c0bd
      }

    } catch (error) {
      let e = error as FirebaseError;
      new NewDialogComponent(this.dialog).OpenNewNotificationDialog('Something went wrong updating this memo item\n' + e.message);
    }
    return String(currentMemo.CreatedDate.toLocaleDateString());
  }


  GetMemo(id: number): Memo {
    const memo = this.Memos.find((s) => {
      return +s.Id === +id;
    }
    )
    return memo as Memo;
  }


  public GetAllMemos$(): Observable<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    if (this.authService.userData.uid === '') {
      this.authService.SignOut();
      return {} as Observable<any>;
    }
    const observable = defer( ()=>  this.afs.collection('users').doc(this.authService.userData.uid).collection('memos').get().toPromise() );
    return observable;

    let user: User = {} as User;
    // return this.afs.collection('users').doc(user.uid).collection('memos').get()
    //   .pipe(
    //     map((data) => {
    //       return data;
    //     }),
    //     tap(data => {
    //       this.Memos = data.docs.map(data => (data.data() as Memo));
    //       // console.log('from authservice GetAllmemos' + JSON.stringify(data.docs)) // listen to the stream but do not touch it
    //     }),
    //  )
  }
}
