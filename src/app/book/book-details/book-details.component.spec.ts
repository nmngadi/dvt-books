
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { BookDetailsComponent } from './book-details.component';
import { IBook } from 'src/app/interfaces/books';
import { BooksService } from 'src/app/services/books.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('BookDetailsComponent', () => {
  let comp: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let book: IBook;
  book = {
    about: 'begineer to advanced angular concepts',
    abstract: '',
    author: {
      href: 'http://localhost:4201/Authors/5d381fc3-f834-40f0-ac7e-498e8a1c2ded',
      id: '5d381fc3-f834-40f0-ac7e-498e8a1c2ded',
      name: 'Wilbur Ivumile Hendry'
    },
    date_published: '2020-04-30T00:00:00+00:00',
    image: 'http://localhost:4201/Books/9781940772486/5218663535684739544.picture',
    isbn10: '1940772486',
    isbn13: '9781940772486',
    publisher: 'Jack loi',
    tags: [{ id: 'Angular', href: 'http://localhost:4201/Tags/Angular', description: 'Angular' }],
    title: 'Angular from Theory to Practise'
  };

  const BooksServiceMock: any = {
    getBook(): Observable<IBook> {
      console.log('Im in book');
      return of(book);
      }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookDetailsComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [{ provide: BooksService, useValue: BooksServiceMock }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BookDetailsComponent);
        comp = fixture.componentInstance;
      });
  }));


});
