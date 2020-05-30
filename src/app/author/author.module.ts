import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorCreateComponent } from './author-create/author-create.component';
import { AuthorEditComponent } from './author-edit/author-edit.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IsbnPipe } from '../pipes/isbn.pipe';
import { AppModule } from '../app.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AuthorListComponent,
    AuthorCreateComponent,
    AuthorEditComponent,
    AuthorDetailsComponent,

  ],
  imports: [
    RouterModule.forChild([
      { path: 'authors', component: AuthorListComponent },
      { path: 'authors/new', component: AuthorCreateComponent },
      { path: 'author/:id/edit', component: AuthorEditComponent },
      { path: 'author/:id/details', component: AuthorDetailsComponent }
    ]),
    SharedModule
  ]
})
export class AuthorModule { }
