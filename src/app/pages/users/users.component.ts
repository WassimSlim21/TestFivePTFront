import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserDetailsComponent } from 'src/app/popup/user-details/user-details.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    console.log('opened dialog');

    const dialogRef = this.dialog.open( UserDetailsComponent, {
      disableClose: false,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
