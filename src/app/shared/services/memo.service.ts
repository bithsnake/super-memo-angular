import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FirebaseError } from 'firebase/app';
import { BehaviorSubject, defer, from, Observable, Observer, of, Subject, Subscription } from 'rxjs';
import { first, map, take, tap } from 'rxjs/operators';
import { YesNoQuestion } from 'src/app/management/dashboard/dashboard.component';
import { Memo } from 'src/app/memo/memo.model';
import { ScrollBackUp, checkOverflow, compareName, compareId, compareCreatedDate } from 'src/app/shared/methods/methods';
import { QuestionComponent } from 'src/app/question/question.component';
import { Ingredient, ingredientsArray, IngredientType } from '../ingredients';
import { NewDialogComponent } from '../new-dialog/new-dialog.component';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection, DocumentData, DocumentReference, QuerySnapshot } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UrlService } from '../url.service';

@Injectable({
  providedIn: 'root'
})
export class MemoServices {

  public memoCreatedSubscrition!: Subscription;
  //cancel
  public onCancelEditMemo: EventEmitter<Boolean> = new EventEmitter();
  // ordering
  public orderMemosByLetter: EventEmitter<Boolean> = new EventEmitter();
  public orderMemosByID: EventEmitter<Boolean> = new EventEmitter();
  public orderMemosByCreated: EventEmitter<Boolean> = new EventEmitter();
  public stackMemos: EventEmitter<Boolean> = new EventEmitter();

  // Observables
  public onNewMemoCreated$: Subject<Memo> = new Subject();
  public onMemoUpdated$: Subject<Memo> = new Subject();
  public onSendmemoAsMail$$: BehaviorSubject<Memo> = new BehaviorSubject(new Memo());
  public onNewIngredientsAdded$: Subject<string> = new Subject();
  public onMemoDeleted$: Subject<Memo> = new Subject();
  public onMemoClicked$: Subject<Memo> = new Subject(); //TODO From memo.service.ts: Used later to set the memo index to the url path if not im not using the routerLink params
  public onResetCurrentMemoIndexOnAll: Subject<Memo> = new Subject();


  public title = 'super-memo-angular';
  public isSignedin: boolean = false;
  public memosCollection!: AngularFirestoreCollection<Memo>;
  public currentActiveMemoIndex: number = -1;
  public memosSubscription!: Subscription;
  public Memos$!: Observable<Memo[]>;
  public UseRow: boolean = false;

  constructor(
    public authService: AuthService,
    private dialog: MatDialog,
    public afs: AngularFirestore, // Inject Firestore db service
    public afAuth: AngularFireAuth, // Inject Firebase auth servce
    public router: Router,
    public urlService: UrlService,
  ) {
    if (this.authService.userData.uid !== '') {
      this.memosCollection = this.afs.collection<Memo>(`users/${this.authService.userData.uid}/memos`);
    }
  }

  public CheckMemoItem(e: Event) {
    const _e = (e.currentTarget as HTMLElement);
    _e.classList.add('rotate-element');
  }
  public GetMemos(): Observable<Memo[]> {

    if (this.authService.userData.uid === '') {
      this.authService.SignOut();
      return {} as Observable<any>;
    }

    return this.afs.collection(`users/${this.authService.userData.uid}/memos`)
      .snapshotChanges().pipe(
        map((snaps : DocumentData) => { // transform snapshots into Memo
          return snaps.map((snap: DocumentData) => {
            return <Memo>{
              ...snap.payload.doc.data()
            }
          })
        }),
        // first() // only does this subscription once per application mount
        // take(5) // take the 5 first values to get emitted
    )
  }
  public  AddNewMemoToList(newMemo: Memo) {
    let addedMemo: DocumentReference<unknown>;
    let memoLastIndex : number;
    const getIndexFromDocs = this.afs.collection(`users/${this.authService.userData.uid}/memos`).get().subscribe(data => {
      memoLastIndex = data.docs.length;
    });

     this.authService.afs.collection(`users/${this.authService.userData.uid}/memos`).add(
        {
          Id: newMemo.Id,
          Title: newMemo.Title,
          Index : newMemo.Index,
          Description: newMemo.Description,
          CreatedDate: newMemo.CreatedDate,
          MemoIcon: newMemo.MemoIcon,
          Ingredients: []
        }
     ).then(x => {

        addedMemo = x;
        addedMemo.update({
          Id: x.id,
          Index: String(memoLastIndex === 0 ? memoLastIndex : memoLastIndex + 1)
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
          }).catch((error : FirebaseError) => {
            throw new Error(`${error.message}`);
          })
        }
      }).then(() => {
        // this.onNewMemoCreated$.next(newMemo);
        getIndexFromDocs.unsubscribe();
        new NewDialogComponent(this.dialog).OpenNewNotificationDialog('Aweseome! a new memo has been born 🥳');
      }).catch((error : FirebaseError) => {
        new NewDialogComponent(this.dialog).OpenNewNotificationDialog('An error occured when creating a memo😔, 📧 error message has reported to the support department' + error.message);
      });
  }
  public OpenDeleteMemoDialog(deleteMemo: Memo) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      deleteItem: false,
      message: 'Are you sure you want to delete this memo item? 👀',
    };

    const dialogRef = this.dialog.open(QuestionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data: YesNoQuestion) => {
      if (data) {

        this.authService.afs.collection('users').doc(this.authService.userData.uid).collection('memos').doc(deleteMemo.Id)
          .delete().then(() => {
            new NewDialogComponent(this.dialog).OpenNewNotificationDialog('Ok memo deleted! 👍');
          }).catch((error: FirebaseError) => {
            console.log("error: ", error);
          })
      }
    })
  }
  // public OrderMemosByLetter  = () => this.Memos.sort(compareName);
  // public OrderMemosByID = () => this.Memos.sort(compareId);
  // public OrderMemosByCreated = () => this.Memos.sort(compareCreatedDate);
  // /**Cdk draw n drop ingredient, this drops an ingredient from one index to another */
  // public drop = (event: CdkDragDrop<Ingredient[]>) => moveItemInArray(this.Memos, event.previousIndex, event.currentIndex);

  // public ResetCurrentMemoIndexOnAll(memo: Memo): void {
  //   this.currentActiveMemoIndex = -1;
  // }
  // public CheckCurrentMemoIndex(checkThisMemo: Memo): void {
  //   if (checkThisMemo === null || checkThisMemo === undefined) return;
  //   const currentIndex = this.Memos.indexOf(checkThisMemo, 0);
  //   this.currentActiveMemoIndex = currentIndex;
  // }

  public UpgradeCurrentMemoIngredients(currentMemo: Memo) {

    try {
      let memo = this.authService.afs.collection('users').doc(this.authService.userData.uid).collection('memos').doc(currentMemo.Id)

      memo.get().subscribe(data => {
        memo.set({
            Id: currentMemo.Id,
            Index: String(currentMemo.Index),
            Title: currentMemo.Title,
            Description: currentMemo.Description,
            CreatedDate: currentMemo.CreatedDate,
            Ingredients: currentMemo.Ingredients
        })
          .finally(() => {

          }).catch((error: FirebaseError) => {
              console.log("error: ", error);
        })
      });
    } catch (error) {
      let e = error as FirebaseError;
      new NewDialogComponent(this.dialog).OpenNewNotificationDialog('Something went wrong updating this memo item 😢\n' + e.message);
    }
  }
  public GetMemo(id: number): Memo {
    let memoDto: Memo = new Memo();
    const memoSub = this.afs.collection(`users/${this.authService.userData.uid}/memos`).get().subscribe((data) => {
      data.docs.map(memos => {
        const memo = (memos.data() as Memo);
        if (+memo.Index !== id) return;
           return memo;
       })
    })
    if (+memoDto.Index < 0) return new Memo();
    return memoDto as Memo;
  }
}

/**Adds an igredient to list if none is found, otherwise one is added to the current ingredient */
export function AddIngredientToList(currentActiveMemoIndex : number, currentMemo : Memo , addedIngredientIcon: IngredientType) {

    const clickedIngredient = ingredientsArray.find(
      (x) => x.Icon === addedIngredientIcon
    );

    let newIngredient: Ingredient;

    if (clickedIngredient === undefined) return;

    newIngredient = new Ingredient(clickedIngredient.Name, clickedIngredient.Icon, 1);

    // Add ingredient to array if the cklicked ingredient in the list does not exists
    if (currentMemo.Ingredients.length === 0) {
      currentMemo.Ingredients.push(newIngredient);
      AnimateElementInChildNode(currentActiveMemoIndex,0);
      return;
    }

    const foundIngredient = currentMemo.Ingredients.find((x) => {return  x.Icon === newIngredient.Icon });
    const ingredientIndex = currentMemo.Ingredients.findIndex((x) => { return x.Icon === newIngredient.Icon });

    if (foundIngredient !== undefined) {
      foundIngredient.Amount += 1;

      AnimateElementInChildNode(currentActiveMemoIndex,ingredientIndex);

      return;
    } else if (foundIngredient === undefined) {
      currentMemo.Ingredients.push(newIngredient);
      AnimateElementInChildNode(currentActiveMemoIndex,currentMemo.Ingredients.length - 1);
      return;
    }
}

/**Animates a a chosen node with a specific class and resets it  */
export function AnimateElementInChildNode(currentActiveMemoIndex : number,nodeIndex: number,targetClassName: string = 'ingredient_item_',addClass: string = 'grow',resetAfterMs: number = 80) {
        const item = document.getElementsByClassName('_memo_lists');
        if (
          item === undefined ||
          item === null ||
          currentActiveMemoIndex === -1
        )
          return;
        document
          .querySelectorAll(`.${'_memo_lists'}`)
          [currentActiveMemoIndex].querySelectorAll(`.${targetClassName}`)
          [nodeIndex].classList.add(String(addClass));
        setTimeout(() => {
          document
            .querySelectorAll(`.${'_memo_lists'}`)
            [currentActiveMemoIndex].querySelectorAll(`.${targetClassName}`)
            [nodeIndex].classList.remove(String(addClass));
        }, resetAfterMs);
};
