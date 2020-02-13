import {Component, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/users';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(private userService: ApiService, private router: Router) {
  }

   users: User[];
    // public user = new User[]();
  pages: any = 0;
  length = 100;
  pageSize = 5;
  pagesIndex = 1;
  pageSizeOptions: number[] = [5, 10, 20];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onPageChange = new EventEmitter<string[]>();

  ngOnInit() {
    this.getUsers(1);
  }

  onPaginateChange(event) {
    this.onPageChange.emit(event.pageIndex + 1);
    this.getUsers(event.pageIndex);
    // console.log(this.users.length);
    // console.log(this.users);
  }
  getUsers(page) {
    this.userService.apiGetAll('/user?pageNo=' + page + '&size=' + this.pageSize).subscribe(
      (users: any) => {
        console.log(users);
        if (users) {

          this.length = users.total;
          this.pages = users.message.pages;
          this.users = users.message;
          this.users.forEach((user) => {
                user.data = JSON.parse(user.data);
              });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitUser() {
    // this.user.next(this.users);
    // console.log('users aaaaaaaa ' + this.user);

  }

}

