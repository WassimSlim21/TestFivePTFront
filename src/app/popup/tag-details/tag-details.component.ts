import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-tag-details',
  templateUrl: './tag-details.component.html',
  styleUrls: ['./tag-details.component.scss']
})
export class TagDetailsComponent implements OnInit {
  socialAccount: any;
  constructor(public dialogRef: MatDialogRef<TagDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private Api: ApiService, private router: Router,   private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    console.log(this.data.tag.name, this.data.tag._id);
    this.loadAccount(this.data.tag._id);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  loadAccount(tagId): void {
    this.Api.apiGetAll('/socialAccount/' + tagId).subscribe(
      (socialAccount: any) => {
        if (socialAccount) {
          this.socialAccount = socialAccount;
          console.log('socialAccount', this.socialAccount);
        }
      },
    error => {
      console.log(error);
    });
}
}
