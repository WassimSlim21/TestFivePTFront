import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/users';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { UserDetailsComponent } from 'src/app/popup/user-details/user-details.component';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { PackUserListComponent } from 'src/app/popup/pack-user-list/pack-user-list.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Output() onListChange = new EventEmitter<string[]>();
  isLoading = true;
  isLoadingStats = true;
  packsNumber: any;
  filterForm: FormGroup;
  displayedColumns: string[] = ['picture', 'name', 'company', 'email', 'score', 'phone', 'pack', 'created_at', 'last_login', 'status'];
  dataSource;
  companyType: any[] = [
    { value: 0, name: 'agency' },
    { value: 1, name: 'brand' },
    { value: 2, name: 'other' }
  ];

  status: any[] = [{ value: 0, name: 'FB Connect' }, { value: 1, name: 'Signup' }, { value: 2, name: 'On Action' }];

  users: User[];
  stats: any;
  companyNumber: any;
  packsTot: any;
  companys: any;
  selectedOption: string;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize = 5;
  length: number;
  pageSizeOptions: number[] = [5, 10];
  moment = moment;
  packs: any;
  @Input() userId: any;

  /*

   // Pie users per packs

  */

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public userPackStat: any;
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['#cb2025', '#f8b334', '#00a096',
                        '#97bf0d', 'rgb(255, 235, 59)', 'rgb(233, 30, 99)']
    },
  ];

  /*

  end Pie users per packs

  */

/*
  barChart User activity per date

*/

public barChartOptions: ChartOptions = {
  responsive: true,
  // We use these empty structures as placeholders for dynamic theming.
  scales: { xAxes: [{}], yAxes: [{}] },
  plugins: {
    datalabels: {
      anchor: 'end',
      align: 'end',
    }
  }
};
public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
public barChartType: ChartType = 'bar';
public barChartLegend = true;
public barChartPlugins = [pluginDataLabels];
public barChartColors = [
  {
    backgroundColor: ['#cb2025', '#f8b334', '#00a096', '#cb2025', '#f8b334', '#00a096', '#cb2025',
                      '#f8b334', '#00a096','#cb2025', '#f8b334', '#00a096', '#cb2025', '#f8b334', '#00a096',
                      '#cb2025', '#f8b334', '#00a096', '#cb2025', '#f8b334', '#00a096']
  },
];

public barChartData: ChartDataSets[] = [
  { data: [65, 59, 70, 61, 56, 55, 40], label: 'Series A' },
  { data: [28, 48, 40, 19, 86, 27, 30], label: 'Series B' },
  { data: [80, 68, 20, 25, 85, 90, 50], label: 'Series C' }

];





public barChartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public barChartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //  console.log(event, active);
}


/*
  /end barChart User activity per date

*/



  constructor(private userService: ApiService,
              private router: Router, public dialog: MatDialog,
              private fb: FormBuilder) {
  }

  /*
  get Users per Packs Stats

  */

  getUserPerPackStats() {
    this.userService.apiGetAll('/stats/UserPerPack').subscribe(
      (data: any) => {
        this.isLoadingStats = false;
        this.userPackStat = data.stats;
        this.packsTot = data.total;

        console.log('user pack', this.userPackStat);
        data.stats.forEach(stat => {
          this.pieChartData.push(stat.count);
          this.pieChartLabels.push(stat.pack);
        });
        // console.log('data', data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /*
// events users per packs

*/



public getUsersWeeklyStats (){
  this.userService.apiGetAll('/stats/usersWeeklyStats').subscribe(
    (response: any) => {
      this.barChartData = response.barChartData ;
      this.barChartLabels = response.labels ;
    }
  );
}
  public chartClicked({ event, active }: { event: MouseEvent, active: any[] }): void {
    console.log(this.userPackStat[active[0]._index]);
    this.openDialogStat(this.userPackStat[active[0]._index]);

  }

  /* Open Dialog pack details */
    openDialogStat(pack): void {
    const dialogRef = this.dialog.open(PackUserListComponent, {
      disableClose: false,
      height: '40%',
      width: '50%',
      data: {
        stat: pack
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  /*
end events users per packs

*/
  loadPacks(): void {
    this.userService.apiGetAll('/pack').subscribe(
      packs => {
        this.packs = packs;
        console.log(this.packs);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.loadPacks();
    this.getUserPerPackStats();
    this.getCompany();
    this.getUsers(1);
    this.getUsersWeeklyStats();
    this.selectedOption = 'agency';
    this.filterForm = this.fb.group({
      name: new FormControl(),
      last_login: new FormControl(),
      created_at: new FormControl(),
      company: new FormControl(),
      company_type: new FormControl(),
      score: new FormControl(),
      pack: new FormControl(),
      status: new FormControl(),
    });
    this.filterForm.valueChanges.subscribe(value => {
      value.last_login = moment(value.last_login).format('YYYY-MM-DD');
      value.created_at = moment(value.created_at).format('YYYY-MM-DD');
      if (value.created_at === 'Invalid date') {
        value.created_at = null;
      }
      if (value.last_login === 'Invalid date') {
        value.last_login = null;
      }

      if (value.status !== null) {
        if (value.status.indexOf(2) >= 0) {
          value.status.push(3);
        }
        if (value.status.indexOf(3) && !value.status.indexOf(2)) {
          value.status.splice(value.status.indexOf(3), 1);
        }
      }
      this.onListChange.emit(value);
      console.log('filter', value);
      this.getFilteredUsers(value);

    });
  }






  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onPaginateChange(event?: PageEvent) {
    this.pageSize = event.pageSize;
    if (event.pageIndex < 1) {
      event.pageIndex = event.pageIndex + 1;
    }
    this.getUsers(event.pageIndex);
  }


  getFilteredUsers(body) {

    this.userService.apiPost('/user/search', body).subscribe(
      (users: any) => {
        console.log('filtered users : ' + users);
        if (users) {
          this.isLoading = false;
          this.users = users;
          this.dataSource = new MatTableDataSource<User>(this.users);


        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUsers(page) {

    this.userService.apiGetAll('/user?pageNo=' + page + '&size=' + this.pageSize).subscribe(
      (users: any) => {
        console.log('users : ' + users);
        if (users) {
          this.packsNumber = users.packsNumber;
          this.isLoading = false;
          this.length = users.total;
          this.pageIndex = users.pageIndex;
          this.users = users.message;
          this.dataSource = new MatTableDataSource<User>(this.users);
          console.log("users", users);

        }
      },
      (error) => {
        console.log(error);
      }
    );
  }


  getCompany() {

    this.userService.apiGetAll('/company?pageNo=' + 1 + '&size=' + 10).subscribe(
      (companys: any) => {
        console.log('companys : ' + companys);
        if (companys) {
          this.isLoading = false;
          this.companyNumber = companys.total;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openDialog(id): void {
    this.userId = id;
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      disableClose: false,
      height: '100%',
      position: { right: '0' },
      data: {
        userId: this.userId
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



}

