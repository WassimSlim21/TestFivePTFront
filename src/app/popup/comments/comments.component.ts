import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import { Account } from 'src/app/core/models/account';
import * as moment from 'moment';

@Component({
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  account: Account;
  file: any;
  comments: any;
  moment = moment ;

  constructor(private apiService: ApiService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    console.log(this.data.fileId);
    this.getFiles(this.data.fileId);

  }
  getFiles(id) {
    this.apiService.apiGetAll(`/file/own/${id}`).subscribe((response: any) => {
      this.file = response.file;
      this.account = response.file.account_id;
      this.comments = response.file.comments;
      console.log('File : ', this.file);
      console.log('Comments : ', this.comments);
      console.log('Account : ', this.account);


  });
}
}
