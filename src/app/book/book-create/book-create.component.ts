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
    private authorservice: AuthorService
  ) {
    this.createBookForm = this.fb.group({

      isbn13: ['', [Validators.required]],
      title: [''],
      about: [''],
      author: [''],
      publisher: [''],
      date_published: [''],
      image: [''],
      tags: [''],
    });
  }

  ngOnInit() {
    forkJoin([
        this.tagservice.getTags(),
        this.authorservice.getAuthors()
      ]).subscribe({
          next: Results => {
            (this.tagList = Results[0]),
              (this.authorList = Results[1]);

          }});
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
  get date_published(): AbstractControl {
    return this.createBookForm.get('date_published');
  }
  get image(): AbstractControl {
    return this.createBookForm.get('image');
  }
  get tags(): AbstractControl {
    return this.createBookForm.get('tags');
  }

  save() {
    this.book = this.createBookForm.value;
    this.selectedTag = [this.tagList.find((x) => x.id === this.tags.value)];
    this.book.tags = this.selectedTag;
    this.selectedAuthors = this.authorList.find(x => x.id === this.author.value);
    this.book.author = this.selectedAuthors;
    this.booksservice.createBook(this.book).subscribe();
  }
}
