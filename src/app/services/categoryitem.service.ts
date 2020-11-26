import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryitemService {
  constructor(private http: HttpClient) {}

  getItems(id: string) {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTYwNjMyMDQ3Mn0.5l1GNGAA_tCyngbf4A4FYrjnh9RwxIc-oCdsTNvHyOs',
      'Content-Type': 'application/json',
    });

    const _ = this.http.get(
      'http://127.0.0.1:3333/api/category/' + id + '/item',
      {
        headers,
      }
    );

    return _;
  }
}
