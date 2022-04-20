import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// Decorator that marks a class as available to be provided and injected as a dependency.
@Injectable({
  providedIn: 'root'
})

  /**Firebase aserive using the AngularFireAuth interface for firebase api methoids */
export class FirebaseService {
  isLoggedIn : boolean = false;
  constructor(public firebaseAuth: AngularFireAuth) { }

  /**Sign in user */
  async SignIn(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {

        this.isLoggedIn = true;
        sessionStorage.setItem('user', JSON.stringify(res.user));

      })
  }
  /**Sin up user */
  async SignUp(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {

        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));

      })
  }
  /**Logout user */
  LogOut() {
    this.firebaseAuth.signOut();
    sessionStorage.removeItem('user');
    sessionStorage.clear();
  }
}
