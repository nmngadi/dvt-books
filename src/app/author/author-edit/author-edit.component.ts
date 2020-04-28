import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { AuthorService } from 'src/app/services/authors.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuthor } from 'src/app/interfaces/author';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css'],
})
export class AuthorEditComponent implements OnInit {
  editAuthorForm: FormGroup;
  author: IAuthor;
  private currentArtistdetails: Subscription;
  constructor(
    private fb: FormBuilder,
    private authorservice: AuthorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editAuthorForm = this.fb.group({
      first_name: ['', [Validators.required]],
      middle_names: [''],
      last_name: ['', Validators.required],
      about: [''],
      id: [''],
    });
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = param;
      this.getAuthor(id);
      this.author.id = id;
    }
  }

  get first_name(): AbstractControl {
    return this.editAuthorForm.get('first_name');
  }
  get last_name(): AbstractControl {
    return this.editAuthorForm.get('last_name');
  }
  get middle_names(): AbstractControl {
    return this.editAuthorForm.get('middle_names');
  }

  get about(): AbstractControl {
    return this.editAuthorForm.get('about');
  }

  getAuthor(id: string): void {
    this.authorservice.getAuthor(id).subscribe({
      next: (author) => {
        this.author = author;
        this.displayAuthor(author);
      },
    });
  }
  displayAuthor(author: IAuthor) {
    if (this.editAuthorForm) {
      this.editAuthorForm.reset();
    }
    this.author = author;

    this.editAuthorForm.patchValue({
      first_name: this.author.first_name,
      last_name: this.author.last_name,
      middle_names: this.author.middle_names,
      name: this.author.name,
      about: this.author.about,
      id: this.author.id,
    });
  }
  save() {
    this.author = this.editAuthorForm.value;
    this.authorservice.updateAuthor(this.author).subscribe();
    this.editAuthorForm.reset();
    this.router.navigate(['/authors']);
  }
}
