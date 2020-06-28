import { AuthorListComponent } from './author-list.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorService } from 'src/app/services/authors.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

import { Observable, of } from 'rxjs';
import { IAuthor } from 'src/app/interfaces/author';

describe('AuthorCreateComponent', () => {
  let comp: AuthorListComponent;
  let fixture: ComponentFixture<AuthorListComponent>;
  let spy: any;
  const AuthorServiceMock: any = {
    getAuthorFilter(): Observable<IAuthor[]> { return of(); }
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
      });
  }));


  it('should call ngOnInit', () => {
    spy = spyOn(comp, 'ngOnInit').and.callThrough();
    comp.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

});
