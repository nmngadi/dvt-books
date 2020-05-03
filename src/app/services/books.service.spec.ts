import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { environment } from '../../environments/environment';
import { IBook } from '../interfaces/books';
import { BooksService } from './books.service';
import { HttpResponse } from '@angular/common/http';

describe('BooksService', () => {
  let httpTestingController: HttpTestingController;
  let bookService: BooksService;
  let books: IBook[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    bookService = TestBed.inject(BooksService);

    books = [
      {

        isbn13: '9452123456803',
        title: 'BI Development',
        about: 'Microsoft technologies',
        author: {
          href: 'http://localhost:4201/Authors/70088445-6ee2-4745-81d1-8faa4f491658',
          id: '70088445-6ee2-4745-81d1-8faa4f491658',
          name: 'Luyanda Weezy Mashabane'
        },
        publisher: '',
        tags: [
          {
            id: 'React',
            href: 'http://localhost:4201/Tags/React',
            description: 'React'
          }
        ]
      }

    ] as IBook[];
  });

  describe('getBooks', () => {
    it('should return Books', (done: DoneFn) => {
      bookService.getBooks('').subscribe((value) => {
        expect(value).toBe(books);
        expect();
        done();
      });
      const req = httpTestingController.expectOne(`${environment.booksUrl}`);
      req.flush(books);
      httpTestingController.verify();
    });

    it('should filter books', (done: DoneFn) => {
      bookService.getBooks('C# Programming').subscribe((value) => {
        expect(value).toBe(books);

        done();
      });
      const req = httpTestingController.expectOne(
        `${environment.booksUrl}?query=C# Programming`
      );
      req.flush(books);
      httpTestingController.verify();
    });

    it('should get one book', () => {
      bookService
        .getBook('9592123456806')
        .subscribe();
      const req = httpTestingController.expectOne(
        `${environment.booksUrl}/${'9592123456806'}`
      );
      req.flush(books);
      httpTestingController.verify();
      expect().nothing();
    });

    it('should add an book and return it', () => {
      const newBook: IBook = {
        isbn13: '9452123456803',
        title: 'BI Development',
        about: 'Microsoft technologies',
        author: {
          href: 'http://localhost:4201/Authors/70088445-6ee2-4745-81d1-8faa4f491658',
          id: '70088445-6ee2-4745-81d1-8faa4f491658',
          name: 'Luyanda Weezy Mashabane'
        },
        publisher: '',
        tags: [
          {
            id: 'React',
            href: 'http://localhost:4201/Tags/React',
            description: 'React'
          }
        ]
      } as IBook;

      bookService
        .createBook(newBook)
        .subscribe((data) =>
          expect(data).toEqual(newBook, 'should return the book')
        );
      const req = httpTestingController.expectOne(environment.booksUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newBook);
      const expectedResponse = new HttpResponse({
        status: 201,
        statusText: 'Created',
        body: newBook,
      });
      req.event(expectedResponse);
    });
  });
});
