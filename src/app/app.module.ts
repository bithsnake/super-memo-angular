import { NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { MemoItemComponent } from'./memo/memo-item/memo-item.component';
import { IngredientsModalComponent } from './shared/ingredients-modal/ingredients-modal.component';
import { MemoMenuComponent } from './memo-menu/memo-menu.component';
import AddNewMemoComponent from './memo/add-new-memo/add-new-memo.component';

// management components
import { DashboardComponent } from './management/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './management/forgot-password/forgot-password.component';
import { SignInComponent } from './management/sign-in/sign-in.component';
import { SignUpComponent } from './management/sign-up/sign-up.component';
import { VerifyEmailComponent } from './management/verify-email/verify-email.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// materials
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { FirebaseService } from './services/firebase.service';
import { provideFirebaseApp } from '@angular/fire/app';

// service
import { AuthService } from './shared/services/auth.service';
import { MainAppComponent } from './main-app/main-app.component';
import { SvgComponent } from './svg/svg.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { AboutComponent } from './about/about.component';
import { QuestionComponent } from './question/question.component';
import { ChangeNameComponent } from './change-name/change-name.component';
import { NotificationComponent } from './notification/notification.component';
import { UrlService } from './shared/url.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PointerSvgComponent } from './shared/pointer-svg/pointer-svg.component';
import { CreateNewIngredientsModalComponent } from './create-new-ingredients-modal/create-new-ingredients-modal.component';
import { MemoAsMailComponent } from './memo-as-mail/memo-as-mail.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CanDeactivateGuard } from './shared/services/can-deactivate-guard.service';
import { MemoItemsComponent } from './memo/memo-items/memo-items.component';
import { Subscription } from 'rxjs';


// Initialize Firebase
export const app = initializeApp(environment.firebase);
export const analytics = getAnalytics(app);

// always add your components in the declarations array!
@NgModule({
  declarations: [
    AppComponent,
    MemoItemComponent,
    MemoItemsComponent,
    IngredientsModalComponent,
    NavbarComponent,
    MemoMenuComponent,
    AddNewMemoComponent,
    MainAppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    SvgComponent,
    BackdropComponent,
    AboutComponent,
      QuestionComponent,
      ChangeNameComponent,
      NotificationComponent,
      PageNotFoundComponent,
      PointerSvgComponent,
      CreateNewIngredientsModalComponent,
      MemoAsMailComponent,
      ErrorPageComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,

    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,

    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,


    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    AuthService,
    UrlService,
    AppComponent,
    CanDeactivateGuard,
  // FirebaseService
  // {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
