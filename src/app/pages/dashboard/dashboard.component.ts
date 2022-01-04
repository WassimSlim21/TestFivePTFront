import { AddSondageComponent } from './../../popup/add-sondage/add-sondage.component';
import { MatDialog } from '@angular/material';
import { ApiService } from 'src/app/core/service/api.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  moment = moment;
  sondages;
  c1 = false;
  c2 = true;
  constructor(private apiService: ApiService,
    public dialog : MatDialog) {
      console.log("val c1" , this.c1);
      console.log("val c2" , this.c2);

    }

  ngOnInit(): void {
    this.getSondages();
  }

  getSondages(){
    this.apiService.apiGetAll('sondage/get').subscribe(
      (response: any) => {
        if (response) {
          this.sondages = response;
          console.log(this.sondages);
        }
      },
    error => {
      console.log(error);
    });  }

    openDialog(id): void {
      const dialogRef = this.dialog.open(AddSondageComponent, {
        disableClose: false,
        height: 'auto',
        width: 'auto',
        data : {
          sondageid:id
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });

    }
}
