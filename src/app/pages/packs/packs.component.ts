import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { ApiService } from 'src/app/core/service/api.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Pack } from 'src/app/core/models/pack';
import * as moment from 'moment';
import { AddPackComponent } from 'src/app/popup/add-pack/add-pack.component';
import { Router } from '@angular/router';


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
  constructor(private apiService: ApiService,
              private router: Router,
              public dialog: MatDialog,
    ) {

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

  openNewPack(): void {
    const dialogRef = this.dialog.open(AddPackComponent, {
      disableClose: false,
      height: '75%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
