import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, NgForm, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/services/authors.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorEditComponent } from './author-edit.component';
import { IAuthor } from 'src/app/interfaces/author';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AuthorEditComponent', () => {
  let comp: AuthorEditComponent;
  let fixture: ComponentFixture<AuthorEditComponent>;
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
    books: []
  };
  const AuthorServiceMock: any = {
    updateAuthor(): Observable<IAuthor> { return of(); },
    getAuthor(): Observable<IAuthor> { return of(author); }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorEditComponent],
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
        fixture = TestBed.createComponent(AuthorEditComponent);

        comp = fixture.componentInstance;
        comp.ngOnInit();
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

  it(`form should call ngAfterViewInit()`, async(() => {
    const spy = spyOn(comp, 'ngAfterViewInit').and.callThrough();
    comp.editAuthorForm.controls.firstName.setValue('Jane');
    comp.editAuthorForm.controls.lastName.setValue('Doe');
    comp.editAuthorForm.controls.middleNames.setValue('Jill');
    comp.editAuthorForm.controls.about.setValue('writes about C#');
    comp.author = author;
    comp.ngAfterViewInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  }));

  it(`ngOnInit is called`, async(() => {
    comp.editAuthorForm.controls.firstName.setValue('Jane');
    comp.editAuthorForm.controls.lastName.setValue('Doe');
    comp.editAuthorForm.controls.middleNames.setValue('Jill');
    comp.editAuthorForm.controls.about.setValue('writes about C#');
    const spy = spyOn(comp, 'getAuthor').and.callThrough();
    comp.param = '1';
    comp.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(comp.author.id).toEqual(comp.param);
  }));

  it('should call edit author method', async () => {
    const spyauthor = spyOn(AuthorServiceMock, 'updateAuthor').and.callThrough();
    const spysave = spyOn(comp, 'save').and.callThrough();
    fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    comp.save();
    expect(spyauthor).toHaveBeenCalled();
  });

});
