import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { forkJoin } from 'rxjs';
import { IBook } from 'src/app/interfaces/books';
import { ITag } from 'src/app/interfaces/tag';
import { IAuthor } from 'src/app/interfaces/author';
import { TagService } from 'src/app/services/tags.service';
import { AuthorService } from 'src/app/services/authors.service';
import { Router } from '@angular/router';
import { dateFormat } from 'src/app/validations/date.validation';
import { isbn13Validation } from 'src/app/validations/isbn13.validation';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
})

export class BookCreateComponent implements OnInit {
  createBookForm: FormGroup;
  book: IBook;
  tagList: ITag[];
  selectedTag: { id: string; href: string; description: string }[];
  authorList: IAuthor[];
  selectedAuthors: {
    href: string;
    id: string;
    name: string;
  };

  constructor(
    private fb: FormBuilder,
    private booksservice: BooksService,
    private tagservice: TagService,
    private authorservice: AuthorService,
    private router: Router
  ) {
    this.createBookForm = this.fb.group({
      isbn10: [''],
      isbn13: ['', [Validators.required, isbn13Validation()]],
      title: ['', [Validators.required]],
      about: [''],
      author: [''],
      publisher: [''],
      datePublished: ['', [dateFormat()]],
      image: [''],
      tags: [''],
    });

    this.book = {
      isbn10: '',
      isbn13: '',
      title: '',
      about: '',
      author: { href: '', id: '', name: '' },
      abstract: '',
      publisher: '',
      date_published: '',
      image: '',
      tags: {}
    } as IBook;
  }

  ngOnInit() {
    forkJoin([
      this.tagservice.getTags(),
      this.authorservice.getAuthors()
    ]).subscribe({
      next: Results => {
        (this.tagList = Results[0]),
          (this.authorList = Results[1]);

      }
    });

    this.isbn10.valueChanges
      .subscribe(x => this.book.isbn10 = x);
    this.isbn13.valueChanges
      .subscribe(x => this.book.isbn13 = x);
    this.title.valueChanges
      .subscribe(x => this.book.title = x);
    this.about.valueChanges
      .subscribe(x => this.book.about = x);
    this.author.valueChanges
      .subscribe(x => this.book.author = x);
    this.publisher.valueChanges
      .subscribe(x => this.book.publisher = x);
    this.datePublished.valueChanges
      .subscribe(x => this.book.date_published = x);
    this.image.valueChanges
      .subscribe(x => this.book.image = x);
    this.tags.valueChanges
      .subscribe(x => this.book.tags = x);
  }

  get isbn10(): AbstractControl {
    return this.createBookForm.get('isbn10');
  }
  get isbn13(): AbstractControl {
    return this.createBookForm.get('isbn13');
  }
  get title(): AbstractControl {
    return this.createBookForm.get('title');
  }
  get about(): AbstractControl {
    return this.createBookForm.get('about');
  }
  get author(): AbstractControl {
    return this.createBookForm.get('author');
  }
  get publisher(): AbstractControl {
    return this.createBookForm.get('publisher');
  }
  get datePublished(): AbstractControl {
    return this.createBookForm.get('datePublished');
  }
  get image(): AbstractControl {
    return this.createBookForm.get('image');
  }
  get tags(): AbstractControl {
    return this.createBookForm.get('tags');
  }

  save() {
    this.selectedTag = [this.tagList.find((x) => x.id === this.tags.value)];
    this.book.tags = this.selectedTag;
    this.selectedAuthors = this.authorList.find(x => x.id === this.author.value);
    this.book.author = this.selectedAuthors;
    this.booksservice.createBook(this.book).subscribe();
    this.createBookForm.reset();
    this.router.navigate(['/authors']);
  }

}
