import { BookCreateComponent } from './book-create.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorService } from 'src/app/services/authors.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookCreateComponent', () => {
  let comp: BookCreateComponent;
  let fixture: ComponentFixture<BookCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookCreateComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [{ provide: AuthorService }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BookCreateComponent);

        comp = fixture.componentInstance;
      });
  }));

  it(`control should be invalid if its not a valid isbn13`, async(() => {
    comp.createBookForm.controls.isbn13.setValue('nhlelo123');
    expect(comp.isbn13.valid).toBeFalse();
  }));

  it(`control should be invalid if its not a valid date format`, async(() => {
    comp.createBookForm.controls.datePublished.setValue('2020/05/05');
    expect(comp.isbn13.valid).toBeFalse();
  }));

});
