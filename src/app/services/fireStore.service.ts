import { DocumentData } from '@angular/fire/compat/firestore';
import { Firestore, collectionData,collection, addDoc } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { Memo } from '../memo/memo.model';

export interface UserInterface {
  accountType: string,
  displayName: string,
  email: string,
  email_lower: string
}

export class _FirebaseStoreService {
  item$: Observable<DocumentData[]>;
  constructor(public _fireStore: Firestore, private app: string) {
    const col = collection(_fireStore, 'users');
    const users = collectionData(col);
    this.item$ = users;
  }

  async setUserData(payload: UserInterface) {
    console.log('Auth Service: saving user data...');

    try {
      const docRef = await addDoc(collection(this._fireStore, 'users'), {
        accountType: payload.accountType,
        displayName: payload.displayName,
        email: payload.email,
        email_lower: payload.email_lower.toLowerCase()
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.log('Error adding document: ', error);
    }
  };
}
