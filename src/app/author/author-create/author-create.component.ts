import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthorService } from 'src/app/services/authors.service';
import { IAuthor } from 'src/app/interfaces/author';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrls: ['./author-create.component.css'],
})
export class AuthorCreateComponent implements OnInit {
  createAuthorForm: FormGroup;
  author: IAuthor;

  constructor(
    private fb: FormBuilder,
    private authorservice: AuthorService,
    private router: Router
  ) {
    this.createAuthorForm = this.fb.group({
      first_name: ['', [Validators.required]],
      middle_names: [''],
      last_name: ['', Validators.required],
      about: [''],
    });
  }

  ngOnInit() {}

  get first_name(): AbstractControl {
    return this.createAuthorForm.get('first_name');
  }
  get last_name(): AbstractControl {
    return this.createAuthorForm.get('last_name');
  }
  get middle_names(): AbstractControl {
    return this.createAuthorForm.get('middle_names');
  }

  get about(): AbstractControl {
    return this.createAuthorForm.get('about');
  }

  save() {
    this.author = this.createAuthorForm.value;
    this.authorservice.createAuthor(this.author).subscribe();
    this.createAuthorForm.reset();
    this.router.navigate(['/authors']);
  }
}
