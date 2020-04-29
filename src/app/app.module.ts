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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    AuthorListComponent,
    AuthorCreateComponent,
    AuthorEditComponent,
    LoaderComponent,
    BookCreateComponent
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
      { path: 'books/new', component: BookCreateComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
