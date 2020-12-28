import { BrowserModule } from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { CreateUpdateComponent } from './components/create-update/create-update.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {TodoListService} from './service/todoList.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DeleteComponent } from './components/delete/delete.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {ListComponent} from './components/list/list.component';
import {AppRoutingModule} from './router/app-routing.module';

/** mocked window token */
export const WINDOW_TOKEN = new InjectionToken<Window>('Window object');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateUpdateComponent,
    DeleteComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    NoopAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatDialogModule,
    MatSortModule,
    ReactiveFormsModule,

  ],
  entryComponents: [
    CreateUpdateComponent,
    DeleteComponent,
  ],
  providers: [
    TodoListService,
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: WINDOW_TOKEN,
      useValue: window,
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
