import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getToken() {
    return localStorage.getItem('token');
  }
  getTokenType() {
    return localStorage.getItem('token_type');
  }
  getReefreshToken() {
    return localStorage.getItem('refresh_token');
  }
  clearLocalStorage() {
    localStorage.clear()
  }
}
