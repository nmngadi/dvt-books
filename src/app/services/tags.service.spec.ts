import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { TagService } from './tags.service';
import { ITag } from '../interfaces/tag';

describe('TagsService', () => {
  let httpTestingController: HttpTestingController;
  let tagservice: TagService;
  let tags: ITag[];
  tags = [
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    tagservice = TestBed.inject(TagService);


  });

  describe('tags service', () => {
    it('should return tags', (done: DoneFn) => {
      tagservice.getTags().subscribe((value) => {
        expect(value).toBe(tags);
        expect();
        done();
      });
      const req = httpTestingController.expectOne(`${environment.tagsUrl}`);
      req.flush(tags);
      httpTestingController.verify();
    });

  });
});
