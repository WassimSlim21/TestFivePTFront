import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { AddBugComponent } from 'src/app/popup/add-bug/add-bug.component';
import { Bug } from 'src/app/core/models/bug';
import * as moment from 'moment';
import { ConfirmDialogModel, ComfirmDialogComponent } from 'src/app/popup/comfirm-dialog/comfirm-dialog.component';
import { log } from 'util';
import { ListUserAssignedBugComponent } from 'src/app/popup/list-user-assigned-bug/list-user-assigned-bug.component';
import { BugDetailsComponent } from 'src/app/popup/bug-details/bug-details.component';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.scss']
})
export class BugComponent implements OnInit {

  bugs: Bug[];
  moment = moment;
  result: any;
  bug: Bug;
  newBug: Bug[] = [];
  inProgress: Bug[] = [];
  readyForTest: Bug[] = [];
  done: Bug[] = [];
  needInfo: Bug[] = [];
  panelOpenState = false;

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
      console.log('event data', event.container.data[event.currentIndex]);
      console.log('event container', event.container.element['nativeElement']['id']);
      this.updateBug(event.container.data[event.currentIndex]['_id'], event.container.element['nativeElement']['id'])
      // console.log('event previousIndex', event.previousIndex);
      // console.log('event currentIndex', event.currentIndex);

    }
  }

  /* Popup Add Bug */

  addBugDialog(): void {
    const dialogRef = this.dialog.open(AddBugComponent, {
      disableClose: false,
      height: 'auto',
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllBugs();
    });

  }


  /* Popup Bug Details and Update */
  OpenBugDetailsDialog(id): void {
    const dialogRef = this.dialog.open(BugDetailsComponent, {
      disableClose: false,
      height: 'auto',
      width: 'auto',
      data: {
        bug_id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllBugs();
    });

  }

  /*Get All Bug*/
  getAllBugs() {
    this.newBug = [];
    this.inProgress = [];
    this.readyForTest = [];
    this.bugs = [];
    this.done = [];
    this.needInfo = [];
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

  /* Update Bug State */

  updateBug(id: any, etat: any) {
    this.apiService.apiPut(`/bug/${id}`, { "etat": etat }).subscribe(
      (response: any) => {
        this.snackBar.open(JSON.stringify(response.message));
      }
    );
  }

  /* Delete Bug */
  comfirmDialog(bug: Bug): void {
    const message = `Are you sure you want to do this?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result === true) {
        this.apiService.apiDelete(`/bug/${bug._id}`).subscribe(
          (response: any) => {
            console.log('delete' + response);
            this.snackBar.open(JSON.stringify(response.message));
            this.getAllBugs();
          }
        );
        this.dialogRef.close();
      }
    });
  }

  openDialogListUser(bugselected): void {
    const dialogRef = this.dialog.open(ListUserAssignedBugComponent, {
      disableClose: false,
      height: 'auto',
      width: '20%',
        data: {
        bug: bugselected
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllBugs();

    });
  }

}
