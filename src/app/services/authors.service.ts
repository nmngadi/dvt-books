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

  getAuthors(): Observable<IAuthor[]> {
    return this.http
      .get(environment.authorUrl)
      .pipe(map((res: any) => res as IAuthor[]));
  }

  getAuthor(id: string): Observable<IAuthor> {
    return this.http
      .get(`${environment.authorUrl}/${id}`)
      .pipe(map((res: any) => res as IAuthor));
  }

  createAuthor(author: IAuthor): Observable<IAuthor> {


    return this.http
      .put<IAuthor>('environment.authorUrl', author)
      .pipe(
        tap((data) => console.log('createAuthor: ' + JSON.stringify(data)))
      );
  }

  updateAuthor(author: IAuthor): Observable<IAuthor> {
    return this.http
      .put<IAuthor>(`${environment.authorUrl}/${author.id}`, author)
      .pipe(
        tap(() => console.log('updateAuthor: ' + author.id)),

        map(() => author)
      );
  }
}
