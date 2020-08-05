import { NgModule } from '@angular/core';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorCreateComponent } from './author-create/author-create.component';
import { AuthorEditComponent } from './author-edit/author-edit.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CanDeactivateGuard } from '../guards/can-deactivate.guard';
import { AuthGuard } from '../guards/auth.guard';

@NgModule({
  declarations: [
    AuthorListComponent,
    AuthorCreateComponent,
    AuthorEditComponent,
    AuthorDetailsComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          { path: '', component: AuthorListComponent },
          { path: 'new', component: AuthorCreateComponent, canDeactivate: [CanDeactivateGuard], canActivate: [AuthGuard] },
          { path: ':id/edit', component: AuthorEditComponent },
          { path: ':id/details', component: AuthorDetailsComponent }]
      }
    ]),
    SharedModule
  ]
})
export class AuthorModule { }
