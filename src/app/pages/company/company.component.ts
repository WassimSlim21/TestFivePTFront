import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { UserDetailsComponent } from 'src/app/popup/user-details/user-details.component';
import { MatDialog, MatSliderChange } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Company } from 'src/app/core/models/company';
import { User } from 'src/app/core/models/users';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onListChange = new EventEmitter<string[]>();
  filterForm: FormGroup;
  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['name', 'company_type', 'countryCode', 'phone', 'website', 'job'];
  dataSource;
  companyType: any[] = [
    { value: 0, name: 'agency' },
    { value: 1, name: 'brand' },
    { value: 2, name: 'other' }
  ];
  companys: any[] = [];
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

  ngOnInit() {

    this.getCompanys(1);
    console.log('aaazazaz ' + this.companys);
    this.selectedOption = 'agency';
    this.filterForm = this.fb.group({
      name: new FormControl(),
      company_type: new FormControl(),
      countryCode: new FormControl(),
      company: new FormControl(),
      phone: new FormControl(),
      website: new FormControl(),
      job: new FormControl()
        });
    this.filterForm.valueChanges.subscribe(value => {
      value.last_login = moment(value.last_login).format('YYYY-MM-DD');
      value.created_at = moment(value.created_at).format('YYYY-MM-DD');
      if (value.created_at === 'Invalid date') {
        value.created_at = null;
      }
      if (value.last_login === 'Invalid date') {
        value.last_login = null;
      }

      this.onListChange.emit(value);
      console.log('filter', value);
    });
  }






  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onPaginateChange(event?: PageEvent) {
    this.pageSize = event.pageSize;
    if (event.pageIndex < 1) {
      event.pageIndex = event.pageIndex + 1;
    }
    this.getCompanys(event.pageIndex);
  }

  getCompanys(page) {

    this.userService.apiGetAll('/user?pageNo=' + page + '&size=' + this.pageSize).subscribe(
      (users: any) => {
        console.log('users : ',   users);
        if (users) {
          this.length = users.total;
          this.pageIndex = users.pageIndex;
          this.users = users.message;
          if (typeof this.users !== 'string') {
          this.users.forEach((company, i) => {
            this.companys.push(JSON.parse(company.data));
            });
          console.log('companies :', this.companys);
          this.dataSource = new MatTableDataSource<Company>(this.companys);

          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // openDialog(id): void {
  //   this.userId = id;
  //   const dialogRef = this.dialog.open(UserDetailsComponent, {
  //     disableClose: false,
  //     height: '100%',
  //     position: { right: '0' },
  //     data: {
  //       userId: this.userId
  //     }

  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }

}
