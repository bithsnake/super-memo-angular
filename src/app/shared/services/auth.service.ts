import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { EmailAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';

const _user: string = 'user';

@Injectable({
  // declares that this service should be created
  // by the root application injector.
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth servce
    public router: Router,
    public ngZone : NgZone // nGZone service to remove outside scope warnings
  ) {
    /* Saving user data in localStorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setitem(_user, JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem(_user)!);
      } else {
        localStorage.setItem(_user, 'null');
        JSON.parse(localStorage.getItem(_user)!)
      }
    });
  }

  // sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
    // Sign up with email/password
    SignUp(email: string, password: string) {
      return this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          /* Call the SendVerificaitonMail() function when new user sign
          up and returns promise */
          this.SendVerificationMail();
          this.SetUserData(result.user);
        })
        .catch((error) => {
          window.alert(error.message);
        });
    }
  // Send email verification when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.SendVerificationMail())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // reset Forgotten password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is logged in and email is verified

  public get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem(_user)!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['dashboard']);
      }
    });
  }

    // Auth logic to run auth providers
    AuthLogin(provider: auth.GoogleAuthProvider | auth.GithubAuthProvider | auth.EmailAuthProvider | auth.FacebookAuthProvider) {
      return this.afAuth
        .signInWithPopup(provider)
        .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['dashboard']);
          });
          this.SetUserData(result.user);
        })
        .catch((error) => {
          window.alert(error);
        });
    }

    /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem(_user);
      this.router.navigate(['sign-in']);
    });
  }
}
