import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, PageEvent, MatDialog } from '@angular/material';
import * as moment from 'moment';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import { SocialAccount } from 'src/app/core/models/social_account';


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
  socialAccounts: SocialAccount[] = [];

  selectedOption: string;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize = 5;
  length: number;
  pageSizeOptions: number[] = [5, 10];
  moment = moment;


  constructor(private socialAccountService: ApiService, private router: Router, public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit() {
    this.getSocialAccounts(1);
  }




  getSocialAccounts(page) {

    this.socialAccountService.apiGetAll('/socialAccount?pageNo=' + page + '&size=' + this.pageSize).subscribe(
      (data: any) => {
        if (data) {
          this.isLoading = false;

          this.length = data.total;
          this.pageIndex = data.pageIndex;
          this.socialAccounts = data.social_accounts;
          this.dataSource = new MatTableDataSource<SocialAccount>(this.socialAccounts);
          console.log('social_accounts', this.socialAccounts);
        }
      },
    error => {
      console.log(error);
    });
  }




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
    this.getSocialAccounts(event.pageIndex);
  }





}
