import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  isLogged: boolean = false;
  infos: any[] = [];
  users: any[] = [];
  logger = {
    email: '',
    password: '',
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login() {
    this.userService.login(this.logger).subscribe(
      (res) => {
        localStorage.setItem('token', res.payload.token);
        localStorage.setItem('token_type', res.payload.type);
        localStorage.setItem('refresh_token', res.payload.refreshToken);

        this.userService.isLogged(true);
        this.router.navigate(['user']);
      },
      (err) => {
        console.log(err.error.msg);
        this.toastr.error('Error al ingresar a la aplicación');
        if (err.error.msg === 'user is logged already') {
          this.router.navigate(['user']);
          this.userService.isLogged(true);
        }
      }
    );
  }

  ngOnInit(): void {
    this.userService.changeObservable.subscribe((res) => {
      this.isLogged = res;
    });
  }
}
