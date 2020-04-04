import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import * as moment from 'moment';
import { Pack } from 'src/app/core/models/pack';

@Component({
  selector: 'app-pack-details',
  templateUrl: './pack-details.component.html',
  styleUrls: ['./pack-details.component.scss']
})
export class PackDetailsComponent implements OnInit {
  isLoading = true ;
  result: any;
  moment = moment;
  dataSource: MatTableDataSource<Pack>;

  displayedColumns: string[] = ['Dashboard', 'Audienceinsight', 'trendengrep', 'custombenchmark',
                                'nationalreport', 'competitorcontent', 'emailsupport' , 'brandingdesign'];
  constructor(public dialogRef: MatDialogRef<PackDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private Api: ApiService, private router: Router,
              private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
  this.loadPack(this.data.packId);
  }



  loadPack(id): void {
    this.Api.apiGetAll('/pack/' + id).subscribe(
      (result: any) => {
        if (result) {
          this.isLoading = false;
          this.result = result;
          this.dataSource = new MatTableDataSource<Pack>(this.result.pack);
          console.log('pack : ', this.result);
          console.log('data source ', this.dataSource);


        }
      }
    );
  }


}
