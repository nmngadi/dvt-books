import { Component, OnInit } from '@angular/core';

import { AuthorService } from 'src/app/services/authors.service';
import { IAuthor } from 'src/app/interfaces/author';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css'],
})
export class AuthorListComponent implements OnInit {
  authors: IAuthor[];

  filteredAuthors: IAuthor[] = [];
  listfilter = '';
  get listFilter(): string {
    return this.listfilter;
  }
  set listFilter(value: string) {
    this.listfilter = value;
    this.filteredAuthors = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.authors;
  }
  constructor(private authorservice: AuthorService) {}

  performFilter(filterBy: string): IAuthor[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.authors.filter(
      (author: IAuthor) =>
        author.first_name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  ngOnInit() {
    this.authorservice.getAuthors().subscribe({
      next: (authors) => {
        this.authors = authors;
        this.filteredAuthors = this.authors;
      },
    });
  }
}
