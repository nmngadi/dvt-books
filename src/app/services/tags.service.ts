import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ITag } from '../interfaces/tag';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private http: HttpClient) {}
  getTags(): Observable<ITag[]> {
    return this.http.get<ITag[]>(environment.tagsUrl);
  }
}
