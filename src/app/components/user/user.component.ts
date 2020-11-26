import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { CategoryitemService } from '../../services/categoryitem.service';
import { Router } from '@angular/router';
import { Item } from '../../models/Item';
import { Info } from '../../models/Info';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: any[] = [];
  infos: any[] = [];
  isLogged: boolean = true;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private categoryitemService: CategoryitemService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.changeObservable.subscribe((res) => {
      this.isLogged = res;
    });
    this.getInfoUser();
    this.userService.isLogged(true);
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
  getInfoUser() {
    this.userService.getInfo().subscribe(
      (res) => {
        for (const user of res.payload) {
          const id: number = user.category_item_id;
          const data = user.data;
          this.users[id] = data;
        }
        this.getCategories();
      },
      (err) => {
        this.toastr.error(err.error.msg);
        this.userService.isLogged(false);
        this.router.navigate(['login']);
      }
    );
  }
}
