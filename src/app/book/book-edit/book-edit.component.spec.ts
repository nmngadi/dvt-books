import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, NgForm, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { BookEditComponent } from './book-edit.component';
import { IBook } from 'src/app/interfaces/books';
import { BooksService } from 'src/app/services/books.service';
import { AuthorService } from 'src/app/services/authors.service';
import { TagService } from 'src/app/services/tags.service';
import { IAuthor } from 'src/app/interfaces/author';
import { ITag } from 'src/app/interfaces/tag';

describe('BookEditComponent', () => {
  let comp: BookEditComponent;
  let fixture: ComponentFixture<BookEditComponent>;
  const BookMockService: any = {

    updateBook(): Observable<IBook> { return of(); },
    getBook(): Observable<IBook> { return of(mockBook); }
  };
  const tags = [
    {
      id: 'Angular',
      href: '/Tags/Angular',
      description: 'Angular'
    },
    {
      id: 'Apple',
      href: '/Tags/Apple',
      description: 'Apple'
    }
  ];


  const authors = [
    {
      href: 'http://localhost:4201/Authors/11490d67-f56f-422a-8e84-ba95d306e976',
      id: '11490d67-f56f-422a-8e84-ba95d306e976',
      first_name: 'Jacob',
      middle_names: 'Terry',
      last_name: 'Mashabane',
      name: 'Jacob Terry Mashabane',
      about: 'writes about C# Programming book',
      version: 'AAAAAAAANsQ=',
      books: [
        {
          href: 'http://localhost:4201/Books/9780446545921',
          id: '9780446545921',
          isbn10: '0198534531',
          isbn13: '9780446545921',
          title: 'Java Programming for begineers'
        },
        {
          href: 'http://localhost:4201/Books/9781940352459',
          id: '9781940352459',
          isbn10: '1940352452',
          isbn13: '9781940352459',
          title: 'C# Programming Basics'
        }
      ]
    }
  ];

  const mockBook: IBook = {
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
  const MockService: any = {
    createAuthor() { },
    postPicture() { },
    getAllAuthor(): Observable<IAuthor[]> { return of(authors); },
    getTags(): Observable<ITag[]> { return of(tags); }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookEditComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [{ provide: BooksService, useValue: BookMockService },
      { provide: AuthorService, useValue: MockService },
      { provide: TagService, useValue: MockService }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BookEditComponent);
        comp = fixture.componentInstance;


      });
  }));

  it(`form should be invalid`, async(() => {
    comp.editBookForm.controls.isbn10.setValue('');
    comp.editBookForm.controls.isbn13.setValue('');
    comp.editBookForm.controls.title.setValue('');
    comp.editBookForm.controls.about.setValue('Java for begineers');
    comp.editBookForm.controls.author.setValue('Java for begineers');
    comp.editBookForm.controls.publisher.setValue('Java for begineers');
    comp.editBookForm.controls.datePublished.setValue('2020/05/06');
    comp.editBookForm.controls.image.setValue('2020/05/06');
    comp.editBookForm.controls.tag.setValue('2020/05/06');
    expect(comp.editBookForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    comp.editBookForm.controls.isbn10.setValue('0198534531');
    comp.editBookForm.controls.isbn13.setValue('9780446545921');
    comp.editBookForm.controls.title.setValue('Java for begineers');
    comp.editBookForm.controls.about.setValue('Java for begineers');
    comp.editBookForm.controls.author.setValue('Java for begineers');
    comp.editBookForm.controls.publisher.setValue('Java for begineers');
    comp.editBookForm.controls.datePublished.setValue('2020/05/06');
    comp.editBookForm.controls.image.setValue('2020/05/06');
    comp.editBookForm.controls.tag.setValue('2020/05/06');
    expect(comp.editBookForm.valid).toBeTruthy();
  }));

  it(`form should call ngAfterViewInit()`, async(() => {
    const spy = spyOn(comp, 'ngAfterViewInit').and.callThrough();
    comp.editBookForm.controls.isbn10.setValue('0198534531');
    comp.editBookForm.controls.isbn13.setValue('9780446545921');
    comp.editBookForm.controls.title.setValue('Java for begineers');
    comp.editBookForm.controls.about.setValue('Java for begineers');
    comp.editBookForm.controls.author.setValue('Java for begineers');
    comp.editBookForm.controls.publisher.setValue('Java for begineers');
    comp.editBookForm.controls.datePublished.setValue('2020/05/06');
    comp.editBookForm.controls.image.setValue('2020/05/06');
    comp.editBookForm.controls.tag.setValue('2020/05/06');
    comp.book = mockBook;
    comp.ngAfterViewInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  }));

  it(`ngOnInit is called`, async(() => {
    comp.editBookForm.controls.isbn10.setValue('0198534531');
    comp.editBookForm.controls.isbn13.setValue('9780446545921');
    comp.editBookForm.controls.title.setValue('Java for begineers');
    comp.editBookForm.controls.about.setValue('Java for begineers');
    comp.editBookForm.controls.author.setValue('Java for begineers');
    comp.editBookForm.controls.publisher.setValue('Java for begineers');
    comp.editBookForm.controls.datePublished.setValue('2020/05/06');
    comp.editBookForm.controls.image.setValue('2020/05/06');
    comp.editBookForm.controls.tag.setValue('2020/05/06');
    const spy = spyOn(comp, 'getBook').and.callThrough();
    comp.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(comp.book.isbn13).toEqual('9452123456803');
  }));

  it('should call save method', async () => {
    comp.editBookForm.controls.author.setValue('Java for begineers');
    comp.editBookForm.controls.tag.setValue('2020/05/06');
    const spybook = spyOn(BookMockService, 'updateBook').and.callThrough();
    const spysave = spyOn(comp, 'save').and.callThrough();
    fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
    comp.tags = tags;
    comp.authors = authors;
    comp.save();
    expect(spybook).toHaveBeenCalled();
  });

});
