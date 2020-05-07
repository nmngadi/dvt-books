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

  constructor(private bookservice: BooksService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('isbn13');
    if (param) {
      const id = param;
      this.bookservice.getBook(param).subscribe({
        next: (book) => {
          this.book = book;
        }
      });

    }
  }

}
