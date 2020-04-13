import { Component, OnInit } from '@angular/core';
import { AddFileComponent } from 'src/app/popup/add-file/add-file.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  constructor(  public dialog: MatDialog) { }

  ngOnInit() {
  }

  addFile(): void {
    const dialogRef = this.dialog.open(AddFileComponent, {
      disableClose: false,
      height: 'auto',
      width : 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
