import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, ThemePalette } from '@angular/material';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent implements OnInit {
  user: any ;
  userId: any;
  imageUrl: any ;



  constructor(
    private Api: ApiService, private router: Router,   private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserDetailsComponent>, private accountService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {

    }

  ngOnInit() {
    this.loadUser();

  }

  loadUser(): void {
    this.userId = '5e4523d375dc034468217da5' ;
    this.Api.getUserAllData(this.userId).subscribe(
      user => {
        this.user = user ;
        this.user.data = JSON.parse(user.data);
        this.user.actions = JSON.parse(user.actions);
        this.imageUrl = 'https://graph.facebook.com/' + this.user.provider_userId + '/picture?height=150&width=150' ;
        this.user.dashboards.forEach(element => {
        if ( element.type === 'SocialAccount') {
          element.color = 'primary';
         } else if (element.type === 'Benchmark') {
         element.color = 'accent' ;
        }
        });
        console.log(this.user);
      },
      error => {
        console.log(error);
        this.snackBar.open('Failed to load user with Id' + this.userId);
      }
    );
}



}


