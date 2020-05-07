import { Component, OnInit, ElementRef } from '@angular/core';

import { AuthorService } from 'src/app/services/authors.service';
import { IAuthor } from 'src/app/interfaces/author';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent implements OnInit {
  authors: IAuthor[] = [];
  searchForm: FormGroup;
  searchinput: string;
  top = 4;
  skip = 0;

  displayViewMore: boolean;

  constructor(private authorservice: AuthorService, private fb: FormBuilder, public auth: AuthService) {
    this.searchForm = this.fb.group({
      searchStr: [''],
    });
  }

  get searchstr(): AbstractControl {
    return this.searchForm.get('searchStr');
  }

  ngOnInit() {

    this.getAuthorsPageinated();
  }
  searchAuthor() {
    this.authorservice.getAuthorsSearch(this.searchinput).subscribe({
      next: authors => {
        this.authors = authors;
      }
    });
  }

  getAuthorsPageinated(): void {
    let AuthorAdd: IAuthor[] = new Array();
    AuthorAdd = this.authors;
    this.authorservice.getAuthorFilter(this.skip, this.top).subscribe((authorFilter) => {
      if (authorFilter.length < this.top) {
        this.displayViewMore = false;
      }
      authorFilter.forEach((x) => {
        AuthorAdd.push(x);
      });
    });
    this.authors = AuthorAdd;
  }

  GetMoreAuthors() {
    this.skip = this.skip + 4;
    this.getAuthorsPageinated();

  }
}
