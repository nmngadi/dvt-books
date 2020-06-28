import { Component, OnInit } from '@angular/core';
import { IBook } from 'src/app/interfaces/books';
import { BooksService } from 'src/app/services/books.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book: IBook;
  param;
  constructor(private bookservice: BooksService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('isbn13');
    if (this.param) {
      this.bookservice.getBook(this.param).subscribe({
        next: (book) => {
          this.book = book;
        }
      });

    }
  }

}
