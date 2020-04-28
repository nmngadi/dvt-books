import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBook } from '../interfaces/books';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class booksService {

  constructor(private http: HttpClient) {}

  getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(environment.booksUrl);
  }

  createBook(book: IBook): Observable<IBook> {
    return this.http.post<IBook>(environment.booksUrl, book)
  }
}
