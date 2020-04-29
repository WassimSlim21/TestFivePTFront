import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { AddBugComponent } from 'src/app/popup/add-bug/add-bug.component';
import { Bug } from 'src/app/core/models/bug';
import * as moment from 'moment';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.scss']
})
export class BugComponent implements OnInit {

  bugs: Bug[];
  moment = moment ;

  todo: Bug[] = [

  ];

   newBug: Bug[] = [];

  inProgress: Bug[] = [];

  readyForTest: Bug[]  = [];

  done: Bug[]  = [
   ];

  needInfo: Bug[] = [];
  constructor(
              private apiService: ApiService,
              private router: Router,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<BugComponent>
  ) { }

  ngOnInit() {
    this.getAllBugs();
  }




  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

/**Popu Add Bug */

  addBugDialog(): void {
    const dialogRef = this.dialog.open(AddBugComponent, {
      disableClose: false,
      height: 'auto',
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getAllBugs() {
    this.apiService.apiGetAll('/bug').subscribe(
      (response: any) => {
        if (response) {
          this.bugs = response;
          this.bugs.forEach(element => {
            if (element.etat === 'newBug') {
              this.newBug.push(element);
            }
            if (element.etat === 'inProgress') {
              this.inProgress.push(element);
            }
            if (element.etat === 'readyForTest') {
              this.readyForTest.push(element);
            }
            if (element.etat === 'done') {
              this.done.push(element);
            }
            if (element.etat === 'needInfo') {
              this.needInfo.push(element);
            }
              });
          console.log(this.bugs);
        }
      },
    error => {
      console.log(error);
    });
  }


}
