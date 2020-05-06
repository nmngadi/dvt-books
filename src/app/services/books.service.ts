import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBook } from '../interfaces/books';
import { environment } from 'src/environments/environment';

import { DomSanitizer } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getBooks(query?: string): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${environment.booksUrl}${query ? `?query=${query}` : ''}`);
  }

  createBook(book: IBook): Observable<IBook> {
    return this.http.post<IBook>(environment.booksUrl, book);
  }
  getBook(isbn13: string): Observable<IBook> {
    return this.http
      .get<IBook>(`${environment.booksUrl}/${isbn13}`);
  }
  updateBook(isbn13: string,book: IBook): Observable<IBook> {
    return this.http.put<IBook>(`${environment.booksUrl}/${isbn13}`, book);
  }

  postPicture(isbn13: string, image: File) {
    return this.http.post(`${environment.booksUrl}/${isbn13}/picture`, image);
  }

  updatePicture(isbn13: string, image: File) {
    return this.http.put(`${environment.booksUrl}/${isbn13}/picture`, image);
  }
}

