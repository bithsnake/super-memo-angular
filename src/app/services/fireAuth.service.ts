import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})


export class _FirebaseAuthService {

  constructor(private firebaseAuth: Auth) { }

  isLoggedIn : boolean = false;

  // /**Sign in user */
  // async SignIn(email: string, password: string) {
  //   await this.firebaseAuth.signInWithEmailAndPassword(email, password)
  //     .then(res => {

  //       this.isLoggedIn = true;
  //       sessionStorage.setItem('user', JSON.stringify(res.user));

  //     })
  // }
  // /**Sin up user */
  // async SignUp(email: string, password: string) {
  //   await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
  //     .then(res => {

  //       this.isLoggedIn = true;
  //       localStorage.setItem('user', JSON.stringify(res.user));

  //     })
  // }
  // /**Logout user */
  // LogOut() {
  //   this.firebaseAuth.signOut();
  //   sessionStorage.removeItem('user');
  //   sessionStorage.clear();
  // }

}
