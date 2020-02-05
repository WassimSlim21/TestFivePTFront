import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EditProfilepopupComponent } from 'src/app/popup/editprofile/edit-profilepopup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit {
  location: Location;
  constructor(private router: Router,public dialog: MatDialog) {

  }
  openDialog(): void {
      let dialogRef = this.dialog.open(EditProfilepopupComponent, {
        width: '600px',
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

  ngOnInit() {
  }
}
