import { NgModule } from '@angular/core';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorCreateComponent } from './author-create/author-create.component';
import { AuthorEditComponent } from './author-edit/author-edit.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth.guard';



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
      { path: 'authors/new', component: AuthorCreateComponent,canActivate: [AuthGuard] },
      { path: 'author/:id/edit', component: AuthorEditComponent },
      { path: 'author/:id/details', component: AuthorDetailsComponent }
    ]),
    SharedModule
  ]
})
export class AuthorModule { }
