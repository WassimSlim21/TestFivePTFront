import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-account-details',
  templateUrl: './social-account-details.component.html',
  styleUrls: ['./social-account-details.component.scss']
})
export class SocialAccountDetailsComponent implements OnInit {
  socialAccount: any;
  users: any;
  constructor(public dialogRef: MatDialogRef<SocialAccountDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private Api: ApiService, private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadSocialAccount(this.data.id);
  }

  // Get Social Account By Id
  loadSocialAccount(tagId): void {
    this.Api.apiGetAll('/socialAccount/' + tagId).subscribe(
      (socialAccount: any) => {
        if (socialAccount){
          this.socialAccount = socialAccount.social_account;
          this.users = socialAccount.users;
          console.log('All', socialAccount);
          console.log('socialAccount', this.socialAccount);
          console.log('users', this.users);

        }
      }
    );
  }
}
