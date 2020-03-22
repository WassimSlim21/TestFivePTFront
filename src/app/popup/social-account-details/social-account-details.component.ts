import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UserDetailsComponent } from '../user-details/user-details.component';
import * as moment from 'moment';
import { TagDetailsComponent } from '../tag-details/tag-details.component';

@Component({
  selector: 'app-social-account-details',
  templateUrl: './social-account-details.component.html',
  styleUrls: ['./social-account-details.component.scss']
})
export class SocialAccountDetailsComponent implements OnInit {
  socialAccount: any;
  users: any;
  tag: any;
  tags: any;
  benchmarks: any;
  moment = moment;

  constructor(public dialogRef: MatDialogRef<SocialAccountDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private Api: ApiService, private router: Router,
              private snackBar: MatSnackBar, public dialog: MatDialog) { }


  ngOnInit() {
    this.loadSocialAccount(this.data.id);
  }

  // TagDetails


  openDialogTagDetails(tag): void {
    this.tag = tag;
    const dialogRef = this.dialog.open(TagDetailsComponent, {
      disableClose: false,
      height : 'auto' ,
      width : 'auto',

      data: {
        tag: this.tag
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // Get Social Account By Id
  loadSocialAccount(tagId): void {
    this.Api.apiGetAll('/socialAccount/' + tagId).subscribe(
      (socialAccount: any) => {
        if (socialAccount) {
          this.socialAccount = socialAccount.social_account;
          this.users = socialAccount.users;
          this.tags = socialAccount.social_account.tags;
          this.benchmarks = socialAccount.benchmarks;
          this.tags.forEach(element => {
            if (element.synonyms) {
              element.synonyms = element.synonyms.split(',');
               } else {
                element.synonyms = [];
               }
              });
          console.log('All', socialAccount);
          console.log('socialAccount', this.socialAccount);
          console.log('users', this.users);

        }
      }
    );
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      disableClose: false,
      height: '90%',
      position: { right: '10' },
      data: {
        userId: id
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
