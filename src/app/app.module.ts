import { NgModule, } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { MemoItemComponent } from'./memo/memo-item/memo-item.component';
import { MemoListComponent } from './memo/memo-list/memo-list/memo-list.component';
import { IngredientsModalComponent } from './shared/ingredients-modal/ingredients-modal.component';
import { MemoMenuComponent } from './memo-menu/memo-menu.component';


// always add your components in the declarations array!
@NgModule({
  declarations: [
    AppComponent,
    MemoItemComponent,
    MemoListComponent,
    IngredientsModalComponent,
    NavbarComponent,
    MemoMenuComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
