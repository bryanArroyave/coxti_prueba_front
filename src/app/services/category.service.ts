import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private autService: AuthService) {}

  getCategories() {
    const token = this.autService.getToken();
    const token_type = this.autService.getTokenType();
    const authorization = token_type + ' ' + token;
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: authorization,
      'Content-Type': 'application/json',
    });

    const _ = this.http.get('http://127.0.0.1:3333/api/category', {
      headers,
    });

    return _;
  }
}
