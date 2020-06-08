import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Account } from 'src/app/core/models/account';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Bug } from 'src/app/core/models/bug';

@Component({
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.scss']
})
export class BugDetailsComponent implements OnInit {
  UpdateBugForm: FormGroup;
  bug: Bug;
  moment = moment;
  isLoading = true ;
  constructor(public dialogRef: MatDialogRef<BugDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private Api: ApiService, private router: Router,
              private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadBug(this.data.bug_id);
  }

  loadBug(id): void {
    this.Api.apiGetAll('/bug/' + id).subscribe(
      (result: any) => {
        if (result) {
          this.isLoading = false;
          this.bug = result;
          console.log('bug : ', this.bug);


        }
      }
    );
  }
}
