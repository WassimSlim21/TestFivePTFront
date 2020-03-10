import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource, PageEvent } from '@angular/material';
import * as moment from 'moment';


@Component({
  selector: 'app-social-accounts',
  templateUrl: './social-accounts.component.html',
  styleUrls: ['./social-accounts.component.scss']
})
export class SocialAccountsComponent implements OnInit {
  isLoading = false;
  filterForm: FormGroup;
  displayedColumns: string[] = ['cover', 'remote_id',  'title', 'provider', 'flagged_at', 'flagged_cause', 'created_at', 'updated_at'];
  dataSource: any;

  selectedOption: string;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize = 5;
  length: number;
  pageSizeOptions: number[] = [5, 10];
  moment = moment;


  constructor() { }

  ngOnInit() {
  }


/*

  getSocialAccounts(page) {

    this.socialAccountService.apiGetAll('/socialAccount?pageNo=' + page + '&size=' + this.pageSize).subscribe(
      (data: any) => {
        if (data) {
          this.isLoading = false;

          this.length = data.total;
          this.pageIndex = data.pageIndex;
          this.social_accounts = data.social_accounts;
          this.dataSource = new MatTableDataSource<SocialAccount>(this.social_accounts);
          console.log('companies', this.social_accounts);
        }
      },
    error => {
      console.log(error);
    });
  }
*/



  // Pagination Methods
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
    //this.getSocialAccount(event.pageIndex);
  }





}
