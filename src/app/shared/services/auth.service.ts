import { Injectable, NgZone } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentData,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import {Router } from '@angular/router';
import { NewDialogComponent } from '../new-dialog/new-dialog.component';
import { UrlService } from '../url.service';
import { Memo } from 'src/app/memo/memo.model';
import { Observable, of, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
// user data in localstorage
const _user: string = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // user data
  public userData: User = {
    uid : '',
    displayName: '',
    email: null,
    photoURL: null,
    emailVerified: false,
  };
  public memos$!: Observable<Memo[]>;
  private Memos!: Memo[];
  // spinner that shows when page is loading
  showSpinner: boolean;

  /*Authorization */
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth servce
    public router: Router,
    public ngZone: NgZone, // nGZone service to remove outside scope warnings
    public dialog: MatDialog,
    public urlService: UrlService,
  ) {


    // Init spinner
    this.showSpinner = false;




    // Observable that checks authentication state
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user as User;
        localStorage.setItem(_user, JSON.stringify(this.userData)); // save in local storage
        JSON.parse(localStorage.getItem(_user)!);

        // force navigation from /sign-in to /app after logging in and email is verfified
        if (this.userData.emailVerified === false) {
          this.ngZone.run(() => {
            this.RouterNavigate('sign-in');
            // this.router.navigate(['sign-in']);
          });
        }
        // check if email verification has been done
        if (this.userData.emailVerified === true) {
          if (this.router.url === '/sign-in' || this.router.url === '' || this.router.url === '/') {
            this.ngZone.run(() => {
              this.RouterNavigate('app');
              // this.router.navigate(['app']);
            });
            return;
          };

          const routeWeirdnessCheck = (this.router.url === '/' || this.router.url === '') && (this.urlService.currentUrl === '/' || this.urlService.currentUrl === '') && this.userData.emailVerified === true;

          // if route is empty, weird or anything but is verified, navigate to /app
          if (routeWeirdnessCheck) {
            this.ngZone.run(() => {
              this.RouterNavigate('app');
              // this.router.navigate(['app']);
            });
            return;
          }

          if (routeWeirdnessCheck) {
            this.ngZone.run(() => {
            this.RouterNavigate('sign-in');
            // this.router.navigate(['sign-in']);
          });
          }
        }

      } else {
        localStorage.setItem(_user, 'null');
        JSON.parse(localStorage.getItem(_user)!)
      };
    });

    if (this.userData.uid) {
      this.afs.collection('users').doc(this.userData.uid).snapshotChanges().subscribe(user => {
        if (user.payload) {
          if (this.userData.emailVerified === true && router.url === '/sign-in') {
            this.ngZone.run(() => {
              this.RouterNavigate('app');
              // this.router.navigate(['app']);
            });
            return;
          };
        };
      });
    };
  };

  /**sign in with email/password */
  SignIn(email: string, password: string) {
    this.showSpinner = true;

    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user !== null) {

          if (result.user.emailVerified === false) {

            this.SendVerificationMail();

            new NewDialogComponent(this.dialog).OpenNewNotificationDialog('Your email address is not verified yet, check your inbox for a verification mail, a new verification mail has been sent');
            this.StopSpinner();
          }

          if (result.user.emailVerified === true) {
            this.afAuth.authState.subscribe((user) => {
              console.log("subscribtion triggered");

              if (user) {
                  this.userData = user as User;
                  localStorage.setItem(_user, JSON.stringify(this.userData));
                  JSON.parse(localStorage.getItem(_user)!);
                  if (this.router.url === '/sign-in') {
                    this.ngZone.run(() => {
                      this.RouterNavigate('app');
                      // this.router.navigate(['app']);
                    });
                  };
              } else {
                localStorage.setItem(_user, 'null');
                JSON.parse(localStorage.getItem(_user)!)
              };

            });
            this.StopSpinner();
          }
          if (!result.user) {
            this.StopSpinner();
            return;
          }

          this.SetUserData(result.user).then(_result => {
            this.StopSpinner();
          })
            .catch((error) => {
              this.StopSpinner();
              new NewDialogComponent(this.dialog).OpenNewNotificationDialog(error);
            });
        }

      })
      .catch((error) => {
        this.StopSpinner();
        new NewDialogComponent(this.dialog).OpenNewNotificationDialog(error.message);
      });
  }
  /**Sign up with email/password */
  SignUp(email: string, password: string, displayName: string = '') {
    this.showSpinner = true;
    if (displayName === '' || displayName.length === 0) {
      new NewDialogComponent(this.dialog).OpenNewNotificationDialog('Your display name can not be empty.');
      return;
    }
    return this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
            /* Call the SendVerificaitonMail() function when new user sign up and returns promise */
            if (result.user !== null) {
              result.user.updateProfile({
                displayName: (displayName === '' || displayName === null) ? 'NoName' : displayName,
              }).then((res) => {
                console.log("current displayname: ", result.user?.displayName);

              })
            }
            this.SendVerificationMail();
            this.SetUserData(result.user);
            this.StopSpinner();
          })
          .catch((error) => {
            this.StopSpinner();
            new NewDialogComponent(this.dialog).OpenNewNotificationDialog(error.message);
          });
  }
  /**Send email verification when new user sign up */
  SendVerificationMail() {
    this.showSpinner = true;

    if (this.ngZone.onError.hasError) {
      new NewDialogComponent(this.dialog).OpenNewNotificationDialog('some ngZone error..try again');
    }
    return this.afAuth.currentUser
      .then((u) => {

        if (this.userData !== null) {
          // delete later
          console.log("this.afAuth.currentUser: ", this.afAuth.currentUser);
          console.log("current user 'u' : ", u);
        }
        if (u === undefined || u === null) {
          new NewDialogComponent(this.dialog).OpenNewNotificationDialog('There is no user with this mailadress.');
          return;
        }

        // Send email verification
        u.sendEmailVerification().catch((error) => {
          new NewDialogComponent(this.dialog).OpenNewNotificationDialog(error);
        });

      })
      .then( () => {
        this.StopSpinner();
        if (this.router.url !== '/verify-email-address') {
          this.RouterNavigate('verify-email-address');
          // this.router.navigate(['verify-email-address']);
        }
      })
      .catch((error) => {
        new NewDialogComponent(this.dialog).OpenNewNotificationDialog(String(error));
      });
  }
  /**reset Forgotten password */
  ForgotPassword(passwordResetEmail: string) {
    this.showSpinner = true;
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.StopSpinner();

        new NewDialogComponent(this.dialog).OpenNewNotificationDialog('Password reset email sent, check your inbox');
        this.dialog.afterAllClosed.subscribe(x => {
          this.RouterNavigate('sign-in');
          // this.router.navigate(['sign-in']);
        })
      })
      .catch((error) => {
        this.StopSpinner();
        new NewDialogComponent(this.dialog).OpenNewNotificationDialog(String(error));
      });
  }
  /**Returns true when user is logged in and email is verified */
  public get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem(_user)!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  /**Sign in with google */
  GoogleAuth() {
    this.showSpinner = true;
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.StopSpinner();
        this.RouterNavigate('app');
        // this.router.navigate(['app']);
        return;
      } else {
        this.StopSpinner();
      }
    }).catch(error => {
      console.log("error: ", error);
      new NewDialogComponent(this.dialog).OpenNewNotificationDialog('Something went wrong with google authentication, check the console logs');
    });
  }
  /**Authentication logic to run different authentication providers */
  AuthLogin(provider: auth.GoogleAuthProvider | auth.GithubAuthProvider | auth.EmailAuthProvider | auth.FacebookAuthProvider) {
    this.showSpinner = true;
      return this.afAuth
        .signInWithPopup(provider)
        .then((result) => {
          this.ngZone.run(() => {
            this.RouterNavigate('dashboard');
            // this.router.navigate(['dashboard']);
          });
          this.StopSpinner();
          this.SetUserData(result.user);
        })
        .catch((error) => {
          this.StopSpinner();
          new NewDialogComponent(this.dialog).OpenNewNotificationDialog(String(error));
        });
  }
  /**Setting up user data when sign in with username/password,
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
  GetAllMemos$() : Observable<QuerySnapshot<DocumentData>> {
    return this.afs.collection(`users`).doc(this.userData.uid).collection('memos').get().pipe(
      tap(data => {
        this.Memos = data.docs.map(data => (data.data() as Memo));
        console.log('from authservice GetAllmemos' + JSON.stringify(data))
      }),
    )

    //   .pipe(
    //    map((data) => {
    //      const newMemoArray = data.docs.map(x => x.data() as Memo);
    //      this.Memos = newMemoArray;
    //   })
    // );

  }
  // Changed from return to async await
  /**Sign out user*/
  async SignOut() {
    this.showSpinner = true;
    await this.afAuth.signOut();
    localStorage.removeItem(_user);
    this.urlService._previousUrl = '';
    this.urlService.currentUrl = '';
    this.StopSpinner();
    this.RouterNavigate('sign-in');
    // this.router.navigate(['sign-in']);
  }
  /*Local router navigate method */
  RouterNavigate = (path: string) : void => {
    this.router.navigate([path]);
  };
  StopSpinner = (): void => { this.showSpinner = false; }
};
