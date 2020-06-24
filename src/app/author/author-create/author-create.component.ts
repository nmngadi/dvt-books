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
import { textonlyValidation } from 'src/app/validations/text-only.validation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrls: ['./author-create.component.scss'],
})
export class AuthorCreateComponent implements OnInit {
  createAuthorForm: FormGroup;
  author: IAuthor;

  hasUnsavedChanges = false;
  constructor(private fb: FormBuilder, private authorservice: AuthorService, private router: Router) {
    this.createAuthorForm = this.fb.group({
      firstName: ['', [Validators.required, textonlyValidation()]],
      lastName: ['', [textonlyValidation()]],
      middleNames: ['', [Validators.required, textonlyValidation()]],
      about: [''],
    });

    this.author = {
      first_name: '',
      last_name: '',
      middle_names: '',
      about: ''
    } as IAuthor;
  }

  get firstName(): AbstractControl {
    return this.createAuthorForm.get('firstName');
  }
  get lastName(): AbstractControl {
    return this.createAuthorForm.get('lastName');
  }
  get middleNames(): AbstractControl {
    return this.createAuthorForm.get('middleNames');
  }

  get about(): AbstractControl {
    return this.createAuthorForm.get('about');
  }

  ngOnInit() {
    this.firstName.valueChanges
      .subscribe(x => this.author.first_name = x);
    this.lastName.valueChanges
      .subscribe(x => this.author.last_name = x);
    this.middleNames.valueChanges
      .subscribe(x => this.author.middle_names = x);
    this.about.valueChanges
      .subscribe(x => this.author.about = x);
    if (this.createAuthorForm.invalid) {
      this.hasUnsavedChanges = true;
    }
  }
  canDeactivate() {

    if (this.createAuthorForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'unsaved changes',
        text: `Please complete form`
      });
      return false;
    } else if (!this.createAuthorForm.invalid) {
      return true;
    }
  }

  save() {
    this.authorservice.createAuthor(this.author).subscribe();
    Swal.fire({
      icon: 'success',
      title: 'Successful',
      text: `Author has been successfully added`
    });
    this.createAuthorForm.reset();
    this.router.navigate(['/authors']);
  }

}
