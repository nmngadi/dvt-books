import { Component, OnInit } from '@angular/core';

import { AuthorService } from 'src/app/services/authors.service';
import { IAuthor } from 'src/app/interfaces/author';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { startWith, tap, map, switchAll } from 'rxjs/operators';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent implements OnInit {
  authors: IAuthor[];
  searchForm: FormGroup;

  constructor(private authorservice: AuthorService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchStr: [''],
    });
  }

  get searchstr(): AbstractControl {
    return this.searchForm.get('searchStr');
  }

  ngOnInit() {
    this.searchstr.valueChanges
      .pipe(
        startWith(''),
        map((searchstr) => this.authorservice.getAuthors(searchstr)),
        switchAll()
      )
      .subscribe((authors) => {
        this.authors = authors;
      });
  }
}
