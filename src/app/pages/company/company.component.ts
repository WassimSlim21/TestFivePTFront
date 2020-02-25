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
  displayedColumns: string[] = ['name', 'company_type',  'website'];
  dataSource;
  companyType: any[] = [
    { value: 0, name: 'agency' },
    { value: 1, name: 'Brand' },
    { value: 2, name: 'other' }
  ];
  companys: Company[] = [];
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
  constructor(private companyService: ApiService, private router: Router, public dialog: MatDialog, private fb: FormBuilder) {
  }

  ngOnInit() {

    this.getCompanys(1);
    console.log('aaazazaz ' + this.companys);
    this.selectedOption = 'agency';
    this.filterForm = this.fb.group({
      name: new FormControl(),
      type: new FormControl(),
      website: new FormControl(),
    });
    this.filterForm.valueChanges.subscribe(value => {
      this.onListChange.emit(value);
      console.log('filter', value);
      this.getFilteredCompany(value);
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

  getFilteredCompany(body) {

    this.companyService.apiPost('/company/search', body).subscribe(
      (companys: any) => {
        console.log('filtered companys : ' + companys);
        if (companys) {
          this.companys = companys;
          this.dataSource = new MatTableDataSource<Company>(this.companys);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }


  getCompanys(page) {

    this.companyService.apiGetAll('/company?pageNo=' + page + '&size=' + this.pageSize).subscribe(
      (companys: any) => {
        if (companys) {
          this.length = companys.total;
          this.pageIndex = companys.pageIndex;
          this.companys = companys.company;
          this.dataSource = new MatTableDataSource<Company>(this.companys);
          console.log(this.companys);
        }
      },
    error => {
      console.log(error);
    });
  }
}
