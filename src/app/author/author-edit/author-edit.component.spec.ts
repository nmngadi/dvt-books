import { ComponentFixture, async, TestBed } from '@angular/core/testing';

import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorService } from 'src/app/services/authors.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorEditComponent } from './author-edit.component';

describe('AuthorEditComponent', () => {
  let comp: AuthorEditComponent;
  let fixture: ComponentFixture<AuthorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorEditComponent],
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
        fixture = TestBed.createComponent(AuthorEditComponent);

        comp = fixture.componentInstance;
      });
  }));

  it(`form should be invalid`, async(() => {
    comp.editAuthorForm.controls.firstName.setValue('');
    comp.editAuthorForm.controls.lastName.setValue('');
    comp.editAuthorForm.controls.middleNames.setValue('');
    comp.editAuthorForm.controls.about.setValue('');
    expect(comp.editAuthorForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    comp.editAuthorForm.controls.firstName.setValue('Jane');
    comp.editAuthorForm.controls.lastName.setValue('Doe');
    comp.editAuthorForm.controls.middleNames.setValue('Jill');
    comp.editAuthorForm.controls.about.setValue('writes about C#');
    expect(comp.editAuthorForm.valid).toBeTruthy();
  }));
});
