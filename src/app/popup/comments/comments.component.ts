import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import { Account } from 'src/app/core/models/account';
import * as moment from 'moment';
import 'emoji-mart/css/emoji-mart.css';
import { ComfirmDialogComponent, ConfirmDialogModel } from '../comfirm-dialog/comfirm-dialog.component';
@Component({
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})

export class CommentsComponent implements OnInit {
  account: Account;
  file: any;
  comments: any;
  moment = moment ;
  myText: any = '';
  body: any;
  account_id: string;
  result: any;
  content: string;

  constructor(private apiService: ApiService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<ComfirmDialogComponent>,
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

addComment() {
  this.content = this.myText;
  this.account_id = JSON.parse(localStorage.getItem('account'))._id;
  this.apiService.apiPost(`/file/comment/` + this.data.fileId,
  {account_id: this.account_id, content: this.content}).subscribe((response: any) => {
    console.log(response);
    this.myText = '';
    this.getFiles(this.data.fileId);
  });
}
comfirmDialog(id_comment: any): void {
  const message = `Are you sure you want to do this?`;
  const dialogData = new ConfirmDialogModel('Confirm Action', message);
  const dialogRef = this.dialog.open(ComfirmDialogComponent, {
    maxWidth: '400px',
    data: dialogData
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    this.result = dialogResult;
    if (this.result === true) {
      this.apiService.apiPut(`/file/comment/${this.file._id}`, {comment_id : id_comment}).subscribe(
        (response: any) => {
          console.log('delete' + response);
          this.snackBar.open('Comment Deleted!');
          this.getFiles(this.data.fileId);
        }
      );
    }
  });
}

}
