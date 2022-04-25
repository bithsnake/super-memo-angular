import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './management/sign-in/sign-in.component';
import { SignUpComponent } from './management/sign-up/sign-up.component';
import { DashboardComponent } from './management/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './management/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './management/verify-email/verify-email.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MemoMenuComponent } from './memo-menu/memo-menu.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { MainAppComponent } from './main-app/main-app.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  // { path: '**',  component: SignInComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },

  { path: 'app', component: MainAppComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
