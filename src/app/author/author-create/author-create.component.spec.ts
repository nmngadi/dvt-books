import { AuthorCreateComponent } from './author-create.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorService } from 'src/app/services/authors.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthorCreateComponent', () => {
  let comp: AuthorCreateComponent;
  let fixture: ComponentFixture<AuthorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorCreateComponent],
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
        fixture = TestBed.createComponent(AuthorCreateComponent);

        comp = fixture.componentInstance;
      });
  }));

  it(`form should be invalid`, async(() => {
    comp.createAuthorForm.controls.first_name.setValue('');
    comp.createAuthorForm.controls.last_name.setValue('');
    comp.createAuthorForm.controls.middle_names.setValue('');
    comp.createAuthorForm.controls.about.setValue('');
    expect(comp.createAuthorForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    comp.createAuthorForm.controls.first_name.setValue('Jane');
    comp.createAuthorForm.controls.last_name.setValue('Doe');
    comp.createAuthorForm.controls.middle_names.setValue('Jill');
    comp.createAuthorForm.controls.about.setValue('writes about C#');
    expect(comp.createAuthorForm.valid).toBeTruthy();
  }));
});
