import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { startWith, map, switchAll, tap } from 'rxjs/operators';
import { IBook } from 'src/app/interfaces/books';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  books: IBook[];
  searchForm: FormGroup;
  loading$ = new BehaviorSubject<boolean>(true);
  constructor(private booksservice: BooksService, private fb: FormBuilder, public auth: AuthService
  ) {
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
        tap(() => this.loading$.next(true)),
        map((searchstr) => this.booksservice.getBooks(searchstr)),
        switchAll()
      )
      .subscribe((books) => {
        this.books = books;
        this.loading$.next(false);
      });
  }
}
