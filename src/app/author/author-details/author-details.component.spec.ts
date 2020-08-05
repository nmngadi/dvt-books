import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { AuthorService } from 'src/app/services/authors.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { IAuthor } from 'src/app/interfaces/author';
import { AuthorDetailsComponent } from './author-details.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('AuthorDetailsComponent', () => {
  let comp: AuthorDetailsComponent;
  let fixture: ComponentFixture<AuthorDetailsComponent>;
  let author: IAuthor;
  author = {
    href:
      'http://localhost:4201/Authors/70088445-6ee2-4745-81d1-8faa4f491658',
    id: '70088445-6ee2-4745-81d1-8faa4f491658',
    first_name: 'Jane',
    middle_names: 'Jill',
    last_name: 'Doe',
    name: 'Jane Jill Doe',
    about: 'writes about romance',
    books:  [{
      href: 'http://localhost:4201/Books/9780578212760',
      id: '9780578212760',
      title: 'C# BOOK',
      isbn10: '0578212765',
      isbn13: '9780578212760'
    }]
  };
  const AuthorServiceMock: any = {
    getAuthor(): Observable<IAuthor> {
      console.log('Im in author');
      return of(author);
      }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorDetailsComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [{ provide: AuthorService, useValue: AuthorServiceMock }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AuthorDetailsComponent);
        comp = fixture.componentInstance;
      });
  }));


  it(`should call ngOnit and call getAuthor `, async(() => {
    fixture.detectChanges();
    const spy = spyOn(AuthorServiceMock, 'getAuthor').and.callThrough();
    comp.ngOnInit();
    comp.param = '70088445-6ee2-4745-81d1-8faa4f491658';
    comp.author = author;
    expect(spy).toHaveBeenCalled();
    expect(comp.author.id).toEqual(comp.param);
  }));

  xit(`should call ngOnit and call getAuthor `, async(() => {
    const spy = spyOn(AuthorServiceMock.getAuthor, 'subscribe').and.callThrough();
    comp.param = '';
    comp.author = author;
    comp.ngOnInit();
    expect(spy).not.toHaveBeenCalled();
  }));
});
