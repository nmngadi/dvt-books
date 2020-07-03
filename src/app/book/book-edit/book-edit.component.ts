import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IBook } from 'src/app/interfaces/books';
import { BooksService } from 'src/app/services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { dateFormat } from 'src/app/validations/date.validation';
import { isbn13Validation } from 'src/app/validations/isbn13.validation';
import { forkJoin } from 'rxjs';
import { TagService } from 'src/app/services/tags.service';
import { AuthorService } from 'src/app/services/authors.service';
import { ITag } from 'src/app/interfaces/tag';
import { IAuthor } from 'src/app/interfaces/author';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit, AfterViewInit {
  constructor(
    private fb: FormBuilder,
    private bookservice: BooksService,
    private tagservice: TagService,
    private authorservice: AuthorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editBookForm = this.fb.group({
      isbn10: [''],
      isbn13: ['', [Validators.required, isbn13Validation()]],
      title: ['', [Validators.required]],
      about: [''],
      author: [''],
      publisher: [''],
      datePublished: ['', [dateFormat()]],
      image: [''],
      tag: [''],
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

  get isbn10(): AbstractControl {
    return this.editBookForm.get('isbn10');
  }
  get isbn13(): AbstractControl {
    return this.editBookForm.get('isbn13');
  }
  get title(): AbstractControl {
    return this.editBookForm.get('title');
  }
  get about(): AbstractControl {
    return this.editBookForm.get('about');
  }
  get author(): AbstractControl {
    return this.editBookForm.get('author');
  }
  get publisher(): AbstractControl {
    return this.editBookForm.get('publisher');
  }
  get datePublished(): AbstractControl {
    return this.editBookForm.get('datePublished');
  }
  get image(): AbstractControl {
    return this.editBookForm.get('image');
  }
  get tag(): AbstractControl {
    return this.editBookForm.get('tag');
  }

  editBookForm: FormGroup;
  book: IBook;
  tags: ITag[];
  authors: IAuthor[];
  param = this.route.snapshot.paramMap.get('isbn13');

  fileData: File = null;

  uploadedFilePath: string = null;

  selectedFile: File;
  ngOnInit() {

    if (this.param) {
      const id = this.param;
      this.getBook(id);
    }
    forkJoin([
      this.tagservice.getTags(),
      this.authorservice.getAllAuthor()
    ]).subscribe({
      next: Results => {
        (this.tags = Results[0]),
          (this.authors = Results[1]);
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
    this.tag.valueChanges
      .subscribe(x => this.book.tags = x
      );

  }

  ngAfterViewInit(): void {
  }


  getBook(id: string): void {
    this.bookservice.getBook(id).subscribe({
      next: (book) => {
        this.book = book;
        this.displayBook(book);
      },
    });
  }

  displayBook(book: IBook) {
    this.book = book;
    console.log(book.date_published);
    this.editBookForm.patchValue({
      isbn10: this.book.isbn10,
      isbn13: this.book.isbn13,
      title: this.book.title,
      about: this.book.about,
      abstract: this.book.abstract,
      publisher: this.book.publisher,
      datePublished: this.book.date_published,
      tag: this.book.tags[0].description,
      author: this.book.author.id,
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  save() {
    this.book.author = this.authors.find((x) => x.id === this.author.value);
    this.book.tags = [this.tags.find((x) => x.id === this.tag.value)];
    this.bookservice.updateBook(this.param, this.book).subscribe();
    this.router.navigate(['/books']);

  }


}
