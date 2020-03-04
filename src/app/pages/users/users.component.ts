import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/users';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { UserDetailsComponent } from 'src/app/popup/user-details/user-details.component';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onListChange = new EventEmitter<string[]>();
  isLoading = true;

  filterForm: FormGroup;
  displayedColumns: string[] = ['picture', 'name', 'company', 'email', 'score', 'phone', 'pack', 'created_at', 'last_login', 'status'];
  dataSource;
  companyType: any[] = [
    { value: 0, name: 'agency' },
    { value: 1, name: 'brand' },
    { value: 2, name: 'other' }
  ];

  status: any[] = [{ value: 0, name: 'FB Connect' }, { value: 1, name: 'Signup' }, { value: 2, name: 'On Action' }];

  users: User[];
  selectedOption: string;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize = 5;
  length: number;
  pageSizeOptions: number[] = [5, 10];
  moment = moment;
  packs: any;
  @Input() userId: any;
  constructor(private userService: ApiService, private router: Router, public dialog: MatDialog, private fb: FormBuilder) {
  }

  loadPacks(): void {
    this.userService.apiGetAll('/pack').subscribe(
      packs => {
        this.packs = packs ;
        console.log(this.packs);
      },
      error => {
        console.log(error);
      }
    );
    }

  ngOnInit() {
    this.loadPacks();

    this.getUsers(1);
    this.selectedOption = 'agency';
    this.filterForm = this.fb.group({
      name: new FormControl(),
      last_login: new FormControl(),
      created_at: new FormControl(),
      company: new FormControl(),
      company_type: new FormControl(),
      score: new FormControl(),
      pack: new FormControl(),
      status: new FormControl(),
    });
    this.filterForm.valueChanges.subscribe(value => {
      value.last_login = moment(value.last_login).format('YYYY-MM-DD');
      value.created_at = moment(value.created_at).format('YYYY-MM-DD');
      if ( value.created_at === 'Invalid date') {
        value.created_at = null;
      }
      if ( value.last_login === 'Invalid date' ) {
        value.last_login = null; }

      if (value.status !== null) {
      if (value.status.indexOf(2) >= 0) {
            value.status.push(3);
        }
      if (value.status.indexOf(3) && !value.status.indexOf(2)) {
        value.status.splice(value.status.indexOf(3), 1);
        }
      }
      this.onListChange.emit(value);
      console.log('filter', value);
      this.getFilteredUsers(value);

    });
  }






  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onPaginateChange(event ?: PageEvent) {
    this.pageSize = event.pageSize;
    if (event.pageIndex < 1) {
      event.pageIndex = event.pageIndex + 1;
    }
    this.getUsers(event.pageIndex);
  }


  getFilteredUsers(body) {

    this.userService.apiPost('/user/search', body).subscribe(
      (users: any) => {
        console.log('filtered users : ' + users);
        if (users) {
          this.isLoading = false;
          this.users = users;
          this.dataSource = new MatTableDataSource<User>(this.users);


        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUsers(page) {

    this.userService.apiGetAll('/user?pageNo=' + page + '&size=' + this.pageSize).subscribe(
      (users: any) => {
        console.log('users : ' + users);
        if (users) {
          this.isLoading = false;
          this.length = users.total;
          this.pageIndex = users.pageIndex;
          this.users = users.message;
          this.dataSource = new MatTableDataSource<User>(this.users);

        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openDialog(id): void {
    this.userId = id;
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      disableClose: false,
      height : '100%' ,
      position: { right: '0'},
      data: {
        userId: this.userId
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

