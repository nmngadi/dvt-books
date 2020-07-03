import { AuthorListComponent } from './author-list.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorService } from 'src/app/services/authors.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

import { Observable, of } from 'rxjs';
import { IAuthor } from 'src/app/interfaces/author';

describe('AuthorListComponent', () => {
  let comp: AuthorListComponent;
  let fixture: ComponentFixture<AuthorListComponent>;
  let spy: any;
  let authors: IAuthor[];
  authors = [ {
    href:
      'http://localhost:4201/Authors/70088445-6ee2-4745-81d1-8faa4f491658',
    id: '70088445-6ee2-4745-81d1-8faa4f491658',
    first_name: 'Jane',
    middle_names: 'Jill',
    last_name: 'Doe',
    name: 'Jane Jill Doe',
    about: 'writes about romance',
    books: []
  }];
  const AuthorServiceMock: any = {
    getAuthorFilter(): Observable<IAuthor[]> { return of(authors); },
    getAllAuthor(): Observable<IAuthor[]> { return of(authors); }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorListComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [{ provide: AuthorService, useValue: AuthorServiceMock }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AuthorListComponent);
        comp = fixture.componentInstance;
        comp.searchForm.controls.searchStr.setValue('');
      });
  }));

  it('should create', () => {
    expect(comp).toBeTruthy();
  });
  it('should call ngOnInit', () => {
    spy = spyOn(comp, 'ngOnInit').and.callThrough();

    fixture.detectChanges();
    comp.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
  it('should call search artist', () => {
    spy = spyOn(AuthorServiceMock, 'getAllAuthor').and.callThrough();
    comp.ngOnInit();
    comp.searchAuthor();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
  it('should call pagininate', () => {
    spy = spyOn(AuthorServiceMock, 'getAuthorFilter').and.callThrough();
    comp.ngOnInit();
    comp.skip = 0;
    comp.top = 4;
    AuthorServiceMock.getAuthorFilter();
    comp.getAuthorsPageinated();
    expect(spy).toHaveBeenCalled();
    expect(comp.displayViewMore).toBe(false);
  });
  it('should call pagininate else', () => {
    spy = spyOn(AuthorServiceMock, 'getAuthorFilter').and.callThrough();
    comp.ngOnInit();
    comp.skip = 0;
    comp.top = 0;
    AuthorServiceMock.getAuthorFilter();
    comp.getAuthorsPageinated();
    expect(spy).toHaveBeenCalled();
  });
  it('should call getMoreAuthors ', () => {
    spy = spyOn(comp, 'getAuthorsPageinated').and.callThrough();
    comp.ngOnInit();
    comp.skip = 0;
    comp.top = 4;
    comp.getMoreAuthors();
    expect(spy).toHaveBeenCalled();
  });

});
