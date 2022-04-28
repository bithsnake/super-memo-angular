import { Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import * as uuid from 'uuid';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { RouteConfigLoadStart, Router } from '@angular/router';
import { EmailAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { stringify } from 'querystring';
import { AuthGuard } from '../guard/auth.guard';
import { NotificationComponent } from 'src/app/notification/notification.component';
import { NewDialogComponent } from '../new-dialog/new-dialog.component';
import { UrlService } from '../url.service';
import { Memo } from 'src/app/memo/memo.model';
import { Ingredient } from '../ingredients';
import firebase from 'firebase/compat/app';
const _user: string = 'user';
@Injectable({
  // declares that this service should be created
  // by the root application injector.
  providedIn: 'root'
})
export class AuthService {
  userData: User = {
    uid : '',
    displayName: '',
    email: null,
    photoURL: null,
    emailVerified: false,
  }; // Save logged in user data
  showSpinner: boolean;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth servce
    public router: Router,
    public ngZone: NgZone, // nGZone service to remove outside scope warnings
    public dialog: MatDialog,
    public urlService : UrlService,
  ) {
    /* Saving user data in localStorage when
    logged in and setting up null when logged out */
    this.showSpinner = false;

    // save data to localStorage
    this.afAuth.authState.subscribe((user) => {
      if (user) {
          this.userData = user as User;
          localStorage.setItem(_user, JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem(_user)!);

          if (this.router.url === '/sign-in') {
            this.ngZone.run(() => {
              this.router.navigate(['app']);
            });
          };

      } else {
        localStorage.setItem(_user, 'null');
        JSON.parse(localStorage.getItem(_user)!)
      };
    });
  }


  // sign in with email/password
  SignIn(email: string, password: string) {
    this.showSpinner = true;
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {

        if (result.user !== null) {
          if (result.user.emailVerified === false) {
            this.SendVerificationMail();
            new NewDialogComponent(this.dialog).OpenNewNotificationDialog('Your email address is not verified yet, check your inbox for a verification mail, a new verification mail has been sent');
            // window.alert('Your email address is not verified yet, check your inbox for a verification mail, a new verification mail has been sent');
            this.showSpinner = false;
            return;
          }
        }
        this.showSpinner = false

        this.SetUserData(result.user)
          // this.router.navigate(['app'])
          .catch((error) => {
            window.alert(error);
          });
      })
      .catch((error) => {
        this.showSpinner = false;
        new NewDialogComponent(this.dialog).OpenNewNotificationDialog(error.message);
        // window.alert(error.message);
      });
  }
    // Sign up with email/password
  SignUp(email: string, password: string, displayName : string = '') {
    this.showSpinner = true;
    return this.afAuth
        .createUserWithEmailAndPassword(email, password)
      .then((result) => {
          /* Call the SendVerificaitonMail() function when new user sign
          up and returns promise */
          if (result.user !== null) {
            result.user.updateProfile({
              displayName: displayName !== '' && displayName !== null ? displayName : "JohnDoe"
            });
          }

          this.SendVerificationMail();
          this.SetUserData(result.user);
          this.showSpinner = false;
        })
        .catch((error) => {
          this.showSpinner = false;
          new NewDialogComponent(this.dialog).OpenNewNotificationDialog(error.message);
          // window.alert(error.message);
        });
    }
  // Send email verification when new user sign up
  SendVerificationMail() {
    this.showSpinner = true;
    if (this.ngZone.onError.hasError) {
      new NewDialogComponent(this.dialog).OpenNewNotificationDialog('some ngZone error..try again');
      // window.alert("error : ");
    }
    return this.afAuth.currentUser
      .then((u) => {
        // u.SendVerificationMail()

        if (this.userData !== null) {
          console.log("this.afAuth.currentUser: ", this.afAuth.currentUser);
          console.log("current user 'u' : ", u);
        }
        if (u === undefined || u === null) {
          new NewDialogComponent(this.dialog).OpenNewNotificationDialog('There is no user with this mailadress.');
          // window.alert("there is no user with this mailadress..");
          return;
        }

        u.sendEmailVerification().catch((error) => {

          window.alert(error);
        });
      })
      .then((something) => {
        // console.log("something: ", something);
        this.showSpinner = false;
        if (this.router.url !== '/verify-email-address') {
          this.router.navigate(['verify-email-address']);
        }
      })
      .catch((error) => {
        new NewDialogComponent(this.dialog).OpenNewNotificationDialog(String(error));
        if (error.status) {

        }
      });
  }
  // reset Forgotten password
  ForgotPassword(passwordResetEmail: string) {
    this.showSpinner = true;
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.showSpinner = false;
        new NewDialogComponent(this.dialog).OpenNewNotificationDialog('Password reset email sent, check your inbox');
        // window.alert('Password reset email sent, check your inbox');
      })
      .catch((error) => {
        this.showSpinner = false;
        new NewDialogComponent(this.dialog).OpenNewNotificationDialog(String(error));
        // window.alert(error);
      });
  }
  // Returns true when user is logged in and email is verified

  public get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem(_user)!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with google
  GoogleAuth() {
    this.showSpinner = true;
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.showSpinner = false;
        this.router.navigate(['dashboard']);
        return;
      } else {
        this.showSpinner = false;
      }
    }).catch(error => {
      new NewDialogComponent(this.dialog).OpenNewNotificationDialog('Something went wrong with google authentication, check the console logs');
      // window.alert('Something went wrong with google authentication, check the console logs');
    });
  }

    // Auth logic to run auth providers
  AuthLogin(provider: auth.GoogleAuthProvider | auth.GithubAuthProvider | auth.EmailAuthProvider | auth.FacebookAuthProvider) {
    this.showSpinner = true;
      return this.afAuth
        .signInWithPopup(provider)
        .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['dashboard']);
          });
          this.showSpinner = false;
          this.SetUserData(result.user);
        })
        .catch((error) => {
          this.showSpinner = false;
          new NewDialogComponent(this.dialog).OpenNewNotificationDialog(String(error));
          // window.alert(error);
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
  };

  async GetAllMemos() {
    return new Promise<any>((resolve) => {
      const snapShot = this.afs.collection(`users`).doc(this.userData.uid).collection('memos').get().subscribe(data => {
        console.log("data.docs: ", data.docs);
        const mappedDocument = data.docs.map(x => x.data() as Memo[]);
        resolve(mappedDocument);
      });
    });
  }
  // Sign out
  SignOut() {
    this.showSpinner = true;
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem(_user);
      this.urlService._previousUrl = '';
      this.urlService.currentUrl = '';
      this.showSpinner = false;
      this.router.navigate(['sign-in']);
    });
  }
}
