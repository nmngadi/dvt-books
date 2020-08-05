import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthorService } from 'src/app/services/authors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuthor } from 'src/app/interfaces/author';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss'],
})
export class AuthorEditComponent implements OnInit, AfterViewInit {
  editAuthorForm: FormGroup;
  author: IAuthor;
  param;

  constructor(
    private fb: FormBuilder,
    private authorservice: AuthorService,
    private route: ActivatedRoute,
    private router: Router

  ) {

    this.editAuthorForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      middleNames: ['', Validators.required],
      about: [''],
    });

  }

  ngOnInit() {
    this.param = this.route.snapshot.paramMap.get('id');
    this.getAuthor(this.param);
    this.author.id = this.param;
  }


  ngAfterViewInit(): void {
    this.firstName.valueChanges
      .subscribe(x => this.author.first_name = x);
    this.lastName.valueChanges
      .subscribe(x => this.author.last_name = x);
    this.middleNames.valueChanges
      .subscribe(x => this.author.middle_names = x);
    this.about.valueChanges
      .subscribe(x => this.author.about = x);
  }

  get firstName(): AbstractControl {
    return this.editAuthorForm.get('firstName');
  }
  get lastName(): AbstractControl {
    return this.editAuthorForm.get('lastName');
  }
  get middleNames(): AbstractControl {
    return this.editAuthorForm.get('middleNames');
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
    this.author = author;
    this.editAuthorForm.patchValue({
      firstName: this.author.first_name,
      lastName: this.author.last_name,
      middleNames: this.author.middle_names,
      about: this.author.about,
      id: this.author.id,
    });
  }

  save() {
    this.authorservice.updateAuthor(this.author).subscribe();
    this.router.navigate(['/authors']);
  }


}
