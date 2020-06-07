import { AuthorCreateComponent } from './author-create.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorService } from 'src/app/services/authors.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { IAuthor } from 'src/app/interfaces/author';

describe('AuthorCreateComponent', () => {
  let comp: AuthorCreateComponent;
  let fixture: ComponentFixture<AuthorCreateComponent>;
  let spy: any;
  const AuthorServiceMock: any = {
    createAuthor(): Observable<IAuthor> { return of(); }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorCreateComponent],
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
        fixture = TestBed.createComponent(AuthorCreateComponent);

        comp = fixture.componentInstance;
      });
  }));


  it(`form should be invalid`, async(() => {
    comp.createAuthorForm.controls.firstName.setValue('');
    comp.createAuthorForm.controls.lastName.setValue('');
    comp.createAuthorForm.controls.middleNames.setValue('');
    comp.createAuthorForm.controls.about.setValue('');
    expect(comp.createAuthorForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    comp.createAuthorForm.controls.firstName.setValue('Jane');
    comp.createAuthorForm.controls.lastName.setValue('Doe');
    comp.createAuthorForm.controls.middleNames.setValue('Jill');
    comp.createAuthorForm.controls.about.setValue('writes about C#');
    expect(comp.createAuthorForm.valid).toBeTruthy();
  }));

  it(`control should be invalid if it contains numbers`, async(() => {
    comp.createAuthorForm.controls.firstName.setValue('nhlelo123');
    expect(comp.firstName.valid).toBeFalsy();
  }));

  it('should call ngOnInit', () => {
    spy = spyOn(comp, 'ngOnInit').and.callThrough();
    comp.ngOnInit();
    comp.createAuthorForm.controls.firstName.setValue('Jane');
    comp.createAuthorForm.controls.lastName.setValue('Doe');
    comp.createAuthorForm.controls.middleNames.setValue('Jill');
    comp.createAuthorForm.controls.about.setValue('writes about C#');
    expect(spy).toHaveBeenCalled();
  });
  describe('Save Method', () => {
    it('should call create author method', async () => {
      const spyauthor = spyOn(AuthorServiceMock, 'createAuthor').and.callThrough();
      const spysave = spyOn(comp, 'save').and.callThrough();
      fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
      fixture.detectChanges();
      AuthorServiceMock.createAuthor();
      comp.save();
      expect(spysave).toHaveBeenCalled();
      expect(spyauthor).toHaveBeenCalled();
    });

  });
});
