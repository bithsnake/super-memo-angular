// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service'
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { AngularFireAuth } from '@angular/fire/compat/auth';

// @Component({
//     selector: 'app-signup',
//     templateUrl: './signup.component.html',
//     styleUrls: ['./signup.component.scss']
// })
// export class SignupComponent implements OnInit {

//     isProgressVisible: boolean;
//     signupForm!: FormGroup;
//     firebaseErrorMessage: string;

//     constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
//       this.isProgressVisible = false;
//       this.firebaseErrorMessage = '';
//       this.signupForm = new FormGroup({}); // empty
//     }

//     ngOnInit(): void {
//         if (this.authService.userLoggedIn) {                       // if the user's logged in, navigate them to the dashboard (NOTE: don't use afAuth.currentUser -- it's never null)
//             this.router.navigate(['/app']);
//         }

//         this.signupForm = new FormGroup({
//             'displayName': new FormControl('TestName', Validators.required),
//             'email': new FormControl('test@mail.com', [Validators.required, Validators.email]),
//             'password': new FormControl('asdf1234', Validators.required)
//         });
//     }

//   signup() {
//     // if (this.signupForm === null) return;

//         if (this.signupForm.invalid)                            // if there's an error in the form, don't submit it
//             return;

//         this.isProgressVisible = true;
//         this.authService.signupUser(this.signupForm.value).then((result) => {
//             if (result == null)                                 // null is success, false means there was an error
//                 this.router.navigate(['/app']);
//             else if (result.isValid == false)
//                 this.firebaseErrorMessage = result.message;

//             this.isProgressVisible = false;                     // no matter what, when the auth service returns, we hide the progress indicator
//         }).catch(() => {
//             this.isProgressVisible = false;
//         });
//     }
// }


// // import { Component, OnInit } from '@angular/core';

// // @Component({
// //   selector: 'app-signup',
// //   templateUrl: './signup.component.html',
// //   styleUrls: ['./signup.component.scss']
// // })
// // export class SignupComponent implements OnInit {

// //   constructor() { }

// //   ngOnInit(): void {
// //   }

// // }