import { Component, OnInit } from '@angular/core';
import { IAuthor } from 'src/app/interfaces/author';
import { AuthorService } from 'src/app/services/authors.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {
  author: IAuthor;
  param;

  constructor(private authorservice: AuthorService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('id');
    if (this.param) {
      this.authorservice.getAuthor(this.param).subscribe({
        next: (author) => {
          this.author = author;
        }
      });

    }
  }

}
