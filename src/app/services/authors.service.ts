import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAuthor } from '../interfaces/author';



@Injectable({
  providedIn: 'root',
})

export class AuthorService {

  constructor(private http: HttpClient) {}

  getAuthors(query?: string): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(`${environment.authorUrl}${query ? `?query=${query}` : ''}`);



  }

  getAuthor(id: string): Observable<IAuthor> {
    return this.http
      .get<IAuthor>(`${environment.authorUrl}/${id}`);
  }

  createAuthor(author: IAuthor): Observable<IAuthor> {
    return this.http
      .post<IAuthor>(environment.authorUrl, author);

  }

  updateAuthor(author: IAuthor): Observable<IAuthor> {
    return this.http
      .put<IAuthor>(`${environment.authorUrl}/${author.id}`, author);


  }
}
