import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { environment } from '../../environments/environment';
import { IAuthor } from '../interfaces/author';
import { AuthorService } from './authors.service';
import { HttpResponse } from '@angular/common/http';

describe('AuthorsService', () => {
  let httpTestingController: HttpTestingController;
  let authorService: AuthorService;
  let authors: IAuthor[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    authorService = TestBed.inject(AuthorService);

    authors = [
      {
        href:
          'http://localhost:4201/Authors/70088445-6ee2-4745-81d1-8faa4f491658',
        id: '70088445-6ee2-4745-81d1-8faa4f491658',
        first_name: 'Jane',
        middle_names: 'Jill',
        last_name: 'Doe',
        name: 'Jane Jill Doe',
        about: 'writes about romance',
      },
    ] as IAuthor[];
  });

  describe('getAuthor', () => {
    it('should return Authors', (done: DoneFn) => {
      authorService.getAllAuthor('').subscribe((value) => {
        expect(value).toBe(authors);
        expect();
        done();
      });

      const req = httpTestingController.expectOne(`${environment.authorUrl}`);
      req.flush(authors);
      httpTestingController.verify();
    });



    it('should get one author', () => {
      authorService
        .getAuthor('70088445-6ee2-4745-81d1-8faa4f491658')
        .subscribe();
      const req = httpTestingController.expectOne(
        `${environment.authorUrl}/${'70088445-6ee2-4745-81d1-8faa4f491658'}`
      );
      req.flush(authors);
      httpTestingController.verify();
      expect().nothing();
    });

    it('should add an author and return it', () => {
      const newAuthor: IAuthor = {
        middle_names: 'Jill',
        last_name: 'Doe',
        name: 'Jane Jill Doe',
        about: 'writes about romance',
      } as IAuthor;

      authorService
        .createAuthor(newAuthor)
        .subscribe((data) =>
          expect(data).toEqual(newAuthor, 'should return the employee')
        );
      const req = httpTestingController.expectOne(environment.authorUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newAuthor);
      const expectedResponse = new HttpResponse({
        status: 201,
        statusText: 'Created',
        body: newAuthor,
      });
      req.event(expectedResponse);
    });
  });
});
