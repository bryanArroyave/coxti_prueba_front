import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private autService: AuthService,
    private toastr: ToastrService
  ) {}

  isLogged: boolean = false;

  ngOnInit(): void {
    this.userService.changeObservable.subscribe((res) => {
      this.isLogged = res;
    
    });
  }

  logout() {
    this.userService.logout().subscribe(
      (res) => {

        this.autService.clearLocalStorage();
        this.userService.isLogged(false);

        this.router.navigate(['login']);
      },
      (err) => {
        this.toastr.error(err.error.msg);
        this.router.navigate(['login']);
      }
    );
  }
}
