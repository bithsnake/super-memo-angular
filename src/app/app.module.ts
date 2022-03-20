import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MemoItemComponent} from'./memo/memo-item/memo-item.component';
import {MemoDescriptionComponent}  from './memo/memo-description/memo-description.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';

// always add your components in the declarations array!
@NgModule({
  declarations: [
    AppComponent,
    MemoItemComponent,
    MemoDescriptionComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
