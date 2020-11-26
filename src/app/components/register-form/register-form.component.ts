import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { CategoryitemService } from '../../services/categoryitem.service';
import { Router } from '@angular/router';
import { Item } from '../../models/Item';
import { Info } from '../../models/Info';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private categoryitemService: CategoryitemService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  index: any = [];
  infos: any = [];
  info_register: any = {};
  users: any[] = [];
  prueba: any = [];
  validations: any = {
    email: '',
    password: '',
  };
  mensaje: string = '';
  logger = {
    email: '',
    password: '',
  };
  isLogged: boolean = false;

  ngOnInit(): void {
    this.userService.changeObservable.subscribe((res) => {
      this.isLogged = res;
    });

    this.getCategories();
  }

  validateInfo() {
    return (
      this.validations.email === this.info_register[4] &&
      this.validations.password === this.info_register[5] &&
      this.validateEmpty()
    );
  }

  validateEmpty() {
    for (let clave in this.info_register) {
      if (!this.info_register[clave]) {
        return false;
      }
    }
    return true;
  }

  singin() {
    if (this.validateInfo())
      this.userService.singin(this.info_register).subscribe(
        (res) => {
          this.router.navigate(['login']);
        },
        (err) => {
          this.toastr.error(err.error.msg);
          this.router.navigate(['login']);
        }
      );
    else {
      this.toastr.error("Campos inválidos");
    }
  }
  cointainClassOpen(classList: []): boolean {
    for (const e of classList) {
      if (e == 'open') {
        return true;
      }
    }
    return false;
  }
  toggleClass(event: any) {
    if (this.cointainClassOpen(event.srcElement.classList)) {
      event.srcElement.classList.remove('open');
    } else {
      event.srcElement.classList.add('open');
    }
  }
  getCategories() {
    const infos: Info[] = [];

    this.categoryService.getCategories().subscribe(
      (res) => {
        for (const category of res.payload) {
          const items: Item[] = this.getCategoriesItems(category.id);
          let info: Info;
          info = { id: category.id, name: category.name, items: items };
          infos.push(info);
        }
      },
      (err) => {
        this.toastr.error(err.error.msg);
        this.userService.isLogged(true);
        this.router.navigate(['/register']);
      }
    );
    this.infos = infos;
  }
  getCategoriesItems(id: string) {
    const items: Item[] = [];

    this.categoryitemService.getItems(id).subscribe(
      (res) => {
        for (const categoryItem of res.payload) {
          this.info_register[categoryItem.id] = '';

          let item: Item;
          item = {
            id: categoryItem.id,
            name: categoryItem.name,
            type: categoryItem.type,
            data: this.users[categoryItem.id],
          };
          items.push(item);
        }
      },
      (err) => {
        this.toastr.error(err.error.msg);
        this.userService.isLogged(false);
        this.router.navigate(['login']);
      }
    );

    return items;
  }
}
