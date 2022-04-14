import { NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { MemoItemComponent } from'./memo/memo-item/memo-item.component';
import { MemoListComponent } from './memo/memo-list/memo-list/memo-list.component';
import { IngredientsModalComponent } from './shared/ingredients-modal/ingredients-modal.component';
import { MemoMenuComponent } from './memo-menu/memo-menu.component';
import AddNewMemoComponent from './memo/add-new-memo/add-new-memo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field'
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
// always add your components in the declarations array!
@NgModule({
  declarations: [
    AppComponent,
    MemoItemComponent,
    MemoListComponent,
    IngredientsModalComponent,
    NavbarComponent,
    MemoMenuComponent,
    AddNewMemoComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    DragDropModule,
    MatInputModule,
  ],
  providers: [
    // {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
