import { BookCreateComponent } from './book-create.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorService } from 'src/app/services/authors.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { TagService } from 'src/app/services/tags.service';
import { of, Observable } from 'rxjs';
import { IAuthor } from 'src/app/interfaces/author';
import { ITag } from 'src/app/interfaces/tag';
import { IBook } from 'src/app/interfaces/books';


describe('BookCreateComponent', () => {
  let comp: BookCreateComponent;
  let fixture: ComponentFixture<BookCreateComponent>;
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
  const MockService: any = {
    createAuthor() { },
    postPicture() { },
    getAllAuthor(): Observable<IAuthor[]> { return of(authors); },
    getTags(): Observable<ITag[]> { return of(tags); }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookCreateComponent],
      imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [{ provide: AuthorService, useValue: MockService },
      { provide: TagService, useValue: MockService }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BookCreateComponent);
        comp = fixture.componentInstance;
      });
  }));

  it(`control should be invalid if its not a valid date format`, () => {
    comp.createBookForm.controls.datePublished.setValue('2020/05/06');

    expect(comp.datePublished.valid).toBeTrue();
  });

  it(`form should be valid`, async(() => {
    comp.ngOnInit();
    comp.createBookForm.controls.isbn10.setValue('0198534531');
    comp.createBookForm.controls.isbn13.setValue('9780446545921');
    comp.createBookForm.controls.title.setValue('Java for begineers');
    comp.createBookForm.controls.about.setValue('Java for begineers');
    comp.createBookForm.controls.author.setValue('Java for begineers');
    comp.createBookForm.controls.publisher.setValue('Java for begineers');
    comp.createBookForm.controls.datePublished.setValue('2020/05/06');
    comp.createBookForm.controls.image.setValue('2020/05/06');
    comp.createBookForm.controls.tag.setValue('2020/05/06');
    expect(comp.createBookForm.valid).toBeTrue();
  }));

  it('should call ngOnInit', () => {
    const spy = spyOn(comp, 'ngOnInit').and.callThrough();
    spyOn(MockService, 'getTags').and.callThrough();
    spyOn(MockService, 'getAllAuthor').and.callThrough();
    comp.ngOnInit();
    MockService.getTags();
    MockService.getAllAuthor();
    expect(spy).toHaveBeenCalled();
  });

  it('should call onFileChanged', () => {
    const event: any = {
      target: {
        files: []
      }
    };
    comp.onFileChanged(event);
    expect(comp.selectedFile).toEqual(event.target.files[0]);
  });

  it('should call save', () => {
    comp.createBookForm.controls.tag.setValue('2020/05/06');
    const spy = spyOn(comp, 'save').and.callThrough();
    spyOn(MockService, 'createAuthor').and.callThrough();
    spyOn(MockService, 'postPicture').and.callThrough();
    comp.tags = tags;
    comp.ngOnInit();
    comp.save();
    expect(spy).toHaveBeenCalled();
  });

});
