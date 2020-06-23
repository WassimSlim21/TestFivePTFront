import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'src/app/core/service/api.service';
import { Account } from 'src/app/core/models/account';
import { Bug } from 'src/app/core/models/bug';

@Component({
  selector: 'app-list-user-assigned-bug',
  templateUrl: './list-user-assigned-bug.component.html',
  styleUrls: ['./list-user-assigned-bug.component.scss']
})
export class ListUserAssignedBugComponent implements OnInit {
  accounts: Account[];
  bug: Bug;
  constructor(private apiService: ApiService, private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ListUserAssignedBugComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getAllAccounts();
    this.bug = this.data.bug;
  }
  getAllAccounts() {
    this.apiService.apiGetAll('/account/get').subscribe(
      (response: any) => {
        if (response) {
          this.accounts = response;
          console.log(this.accounts);
        }
      },
    error => {
      console.log(error);
    });
  }

  /* Update Bug User Assigned */

  UpdateBugAssignedUser(userId: any) {
    this.apiService.apiPut(`/bug/userAssigned/${this.bug._id}`, { "account_assigned_id": userId }).subscribe(
      (response: any) => {
        this.snackBar.open(JSON.stringify(response.message));
      }
    );
    this.apiService.apiPost('/notification/',
    {source : JSON.parse(localStorage.getItem('account'))._id,
     content : `A bug (${this.bug.name}) was assigned to you by ${JSON.parse(localStorage.getItem('account')).userName}`,
     destinations : [userId]}).subscribe(response => {
      console.log('notifiier :', response);
    });
    this.dialogRef.close();
  }

}
