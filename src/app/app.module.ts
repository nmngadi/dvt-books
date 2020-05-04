import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorCreateComponent } from './author/author-create/author-create.component';
import { AuthorEditComponent } from './author/author-edit/author-edit.component';
import { LoaderComponent } from './loader/loader.component';
import { BookCreateComponent } from './book/book-create/book-create.component';
import { BooksListComponent } from './book/books-list/books-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {IsbnPipe} from './pipes/isbn.pipe';
import { BookEditComponent } from './book/book-edit/book-edit.component';
import { AuthorDetailsComponent } from './author/author-details/author-details.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    AuthorListComponent,
    AuthorCreateComponent,
    AuthorEditComponent,
    LoaderComponent,
    BookCreateComponent,
    BooksListComponent,
    IsbnPipe,
    BookEditComponent,
    AuthorDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'authors', component: AuthorListComponent },
      { path: 'authors/new', component: AuthorCreateComponent },
      {
        path: 'author/:id/edit',
        component: AuthorEditComponent,
      },
      {
        path: 'author/:id/details',
        component: AuthorDetailsComponent,
      },
      { path: 'books/new', component: BookCreateComponent },
      { path: 'books', component: BooksListComponent },
      {
        path: 'book/:isbn13/edit',
        component: BookEditComponent
      }
    ]),
    BrowserAnimationsModule,
    MatIconModule,
    MatSelectModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
