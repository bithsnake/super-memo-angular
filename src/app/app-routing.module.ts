import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './management/sign-in/sign-in.component';
import { SignUpComponent } from './management/sign-up/sign-up.component';
import { DashboardComponent } from './management/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './management/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './management/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { MainAppComponent } from './main-app/main-app.component';
import { AboutComponent } from './about/about.component';
import { MemoItemEditComponent } from './memo/memo-item-edit/memo-item-edit.component';
import { CanDeactivateGuard } from './shared/services/can-deactivate-guard.service';
import { MemoItemComponent } from './memo/memo-item/memo-item.component';
import { MemoResolver } from './memo/memo-resolver.service';
import { MemoItemsComponent } from './memo/memo-items/memo-items.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent,  },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  { path: 'verify-email-address', component: VerifyEmailComponent },

  { path: 'app', component: MainAppComponent, canActivateChild: [AuthGuard],
    children: [
      { path: 'items/:id', component: MemoItemComponent, resolve: { server: MemoResolver } },
      {
        path: 'items/:id/edit',
        component: MemoItemEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
    ],
  },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  //keep commented
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: '**', redirectTo: window.location.pathname === '' ? '/sign-in' : window.location.pathname,  pathMatch: 'full'},
  // old
  // { path: '**',  redirectTo: '/app', },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
