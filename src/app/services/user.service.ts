import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private autService: AuthService) {}

  private changeLogged = new Subject<boolean>();
  changeObservable = this.changeLogged.asObservable();

  isLogged(logged: boolean) {
    this.changeLogged.next(logged);
  }

  login(logger: { email: string; password: string }) {
    const { email, password } = logger;

    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    const _ = this.http.post(
      'http://127.0.0.1:3333/api/auth/login',
      {
        email,
        password,
      },
      {
        headers,
      }
    );
    return _;
  }

  singup(data: {}) {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    const _ = this.http.post(
      'http://127.0.0.1:3333/api/auth/singup',
      {
        data,
      },
      {
        headers,
      }
    );
    return _;
  }

  logout() {
    const token = this.autService.getToken();
    const token_type = this.autService.getTokenType();
    const authorization = token_type + ' ' + token;
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: authorization,
      'Content-Type': 'application/json',
    });

    const _ = this.http.post(
      'http://127.0.0.1:3333/api/auth/logout',
      {},
      {
        headers,
      }
    );
    return _;
  }
  getInfo() {
    const token = this.autService.getToken();
    const token_type = this.autService.getTokenType();
    const authorization = token_type + ' ' + token;
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: authorization,
      'Content-Type': 'application/json',
    });

    const _ = this.http.get('http://127.0.0.1:3333/api/userinformation', {
      headers,
    });
    return _;
  }
}
