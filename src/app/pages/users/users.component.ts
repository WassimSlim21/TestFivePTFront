import {Component, OnInit, ViewChild, EventEmitter, Output, Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/users';
import {PageEvent} from '@angular/material/paginator';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { UserDetailsComponent } from 'src/app/popup/user-details/user-details.component';
import {MatSort} from '@angular/material/sort';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onPageChange = new EventEmitter<string[]>();
  displayedColumns: string[] = ['picture', 'name', 'score', 'email', 'phone', 'email', 'pack', 'created_at', 'last_login', 'status'];

  dataSource;

  users: User[];
   // public user = new User[]();
   pageEvent: PageEvent;
   datasource: null;
   pageIndex: number;
   pageSize = 5;
   length: number;
 pageSizeOptions: number[] = [5, 10];
 moment = moment;
 @Input() userId: any;
  constructor(private userService: ApiService, private router: Router, public dialog: MatDialog) {
   }



  ngOnInit() {
    this.getUsers(1);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {
      this.users = data;
      return;
    }

    this.users = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'created_at': return this.compare(a.created_at, b.created_at, isAsc);
        case 'last_login': return this.compare(a.last_login, b.last_login, isAsc);
        case 'status': return this.compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }



  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onPaginateChange(event?: PageEvent) {
    this.pageSize = event.pageSize;
    if ( event.pageIndex < 1 ) {
          event.pageIndex = event.pageIndex + 1;
    }
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
          this.pageIndex = users.pageIndex;
          this.users = users.message;
          this.dataSource = new MatTableDataSource<User>(this.users);
          if (typeof this.users !== 'string') {
            this.users.forEach((user) => {
              user.data = JSON.parse(user.data);
            });
          }

        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openDialog(id): void {
    this.userId = id;
    console.log("aaaaaa"+this.userId);
    const dialogRef = this.dialog.open( UserDetailsComponent, {
      disableClose: false,
      data: {
        userId: this.userId
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}

