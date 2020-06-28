import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCreateComponent } from './book-create/book-create.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CanDeactivateGuard } from '../guards/can-deactivate.guard';
import { AuthGuard } from '../guards/auth.guard';


@NgModule({
  declarations: [
    BookCreateComponent,
    BooksListComponent,
    BookEditComponent,
    BookDetailsComponent],
  imports: [
    MatIconModule,
    MatSelectModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'books/new', component: BookCreateComponent , canDeactivate: [CanDeactivateGuard], canActivate: [AuthGuard]},
      { path: 'books', component: BooksListComponent },
      { path: 'book/:isbn13/edit', component: BookEditComponent },
      { path: 'book/:isbn13/details', component: BookDetailsComponent }
    ])
  ]
})
export class BookModule { }
