import { Component, OnInit } from '@angular/core';
import { IAuthor } from 'src/app/interfaces/author';
import { AuthorService } from 'src/app/services/authors.service';
import { Router, ActivatedRoute } from '@angular/router';
import { booksRef } from 'src/app/interfaces/bookRef';
import { authorRef } from 'src/app/interfaces/authorRef';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {
author: IAuthor;


  constructor(private authorservice: AuthorService, private route: ActivatedRoute,  private router: Router) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = param;
      this.authorservice.getAuthor(param).subscribe({
      next: (author) => {
        this.author = author;
     }
    });

    }
  }

}
