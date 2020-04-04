import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { ApiService } from 'src/app/core/service/api.service';
import { MatTableDataSource, MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { Pack } from 'src/app/core/models/pack';
import * as moment from 'moment';
import { ConfirmDialogModel, ComfirmDialogComponent } from 'src/app/popup/comfirm-dialog/comfirm-dialog.component';
import { PackDetailsComponent } from 'src/app/popup/pack-details/pack-details.component';
import { UpdatePackComponent } from 'src/app/popup/update-pack/update-pack.component';


@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.scss']
})
export class PacksComponent implements OnInit {
  isLoading = true ;
  moment = moment;
  public packs: any[];
  displayedColumns: string[] = ['Packname', 'AnnualSubscriiption', 'DataHistory', 'SocialAccounts',
                                'Benchmarks', 'CreatedAt', 'UpdatedAt' , 'star'];
  dataSource: MatTableDataSource<Pack>;
  result: any;


  constructor(private apiService: ApiService, public dialog: MatDialog,  private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ComfirmDialogComponent>) {

   }
  ngOnInit() {

    this.getPacks();
  }
  getPacks() {
    this.apiService.apiGetAll('/pack').subscribe(
      (response: any) => {
        if (response) {
          this.isLoading = false;
          this.packs = response;
          this.dataSource = new MatTableDataSource<Pack>(this.packs);
          console.log(response);
        }
      },
    error => {
      console.log(error);
    });
  }


  getBenchmarks(page) {
    this.apiService.apiGetAll('/pack').subscribe(
      (rep: any) => {
        if (rep) {
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<Pack>(this.packs);
          console.log('packs', this.packs);
        }
      },
      error => {
        console.log(error);
      });
  }

  comfirmDialog(pack: any): void {
    const message = `Are you sure you want to do this?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      const index = this.packs.indexOf(pack);
      if ( this.result === true) {
        this.apiService.apiDelete(`/pack/${pack._id}`).subscribe(
          (response: any) => {
            console.log('delete' + response);
            this.snackBar.open(JSON.stringify(response.message));
            this.getPacks();
          }
      );
        this.dialogRef.close();
    }
    });
  }


  openDialog(id): void {
    const dialogRef = this.dialog.open(PackDetailsComponent, {
      disableClose: false,
      height : 'auto' ,
      width : 'auto',

      data: {
        packId: id
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialogUpdate(id): void {
    const dialogRef = this.dialog.open(UpdatePackComponent, {
      disableClose: false,
      height : 'auto' ,
      width : 'auto',

      data: {
        packId: id
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
