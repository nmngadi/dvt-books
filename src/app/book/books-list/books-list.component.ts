import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { startWith, map, switchAll } from 'rxjs/operators';
import { IBook } from 'src/app/interfaces/books';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.sass']
})
export class BooksListComponent implements OnInit {
  books: IBook[];
  searchForm: FormGroup;

  constructor(private booksservice: BooksService, private fb: FormBuilder) {
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
        map((searchstr) => this.booksservice.getBooks(searchstr)),
        switchAll()
      )
      .subscribe((books) => {
        this.books = books;
      });
  }

}
