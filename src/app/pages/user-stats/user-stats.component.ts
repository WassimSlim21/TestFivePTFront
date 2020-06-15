import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ApiService } from 'src/app/core/service/api.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { PackUserListComponent } from 'src/app/popup/pack-user-list/pack-user-list.component';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss']
})
export class UserStatsComponent implements OnInit {

  isLoadingStats = true;
  packsTot: any;
  companyNumber: any;
  length: number;
  packsNumber: any;

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
  public userPackStat: any[];
  public pieChartLabels: Label[] = [['', ''], ['', '', ''], ' '];
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
    barChart User activity per day

  */

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartData: ChartDataSets[] = [
    { data: [], label: '' }

  ];
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartColors = [
    {
      backgroundColor: ['#cb2025', '#f8b334', '#00a096', '#cb2025', '#f8b334', '#00a096', '#cb2025',
        '#f8b334', '#00a096', '#cb2025', '#f8b334', '#00a096', '#cb2025', '#f8b334', '#00a096',
        '#cb2025', '#f8b334', '#00a096', '#cb2025', '#f8b334', '#00a096']
    },
  ];


  public barChartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  public barChartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  constructor(private userService: ApiService,
    private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsersWeeklyStats();
    this.getUserPerPackStats();
    this.getUsers();
    this.getCompany();
  }


  getUserPerPackStats() {
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.userService.apiGetAll('/stats/UserPerPack').subscribe(
      (data: any) => {
        this.isLoadingStats = false;
        this.userPackStat = data.stats;
        this.packsTot = data.total;
        data.stats.forEach(stat => {
          this.pieChartData.push(stat.count);
          this.pieChartLabels.push(stat.pack);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public getUsersWeeklyStats() {
    this.userService.apiGetAll('/stats/usersWeeklyStats').subscribe(
      (response: any) => {
        this.barChartData = response.barChartData;
        this.barChartLabels = response.labels;
      }
    );
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: any[] }): void {
    this.openDialogStat(this.userPackStat[active[0]._index]);
  }
  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
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
    });
  }


  /*
end events users per packs

*/


  getCompany() {
    this.userService.apiGetAll('/company?pageNo=' + 1 + '&size=' + 10).subscribe(
      (companys: any) => {
        if (companys) {
          this.companyNumber = companys.total;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUsers() {
    this.userService.apiGetAll('/user/').subscribe(
      (users: any) => {
        if (users) {
          this.packsNumber = users.packsNumber;
          this.length = users.total;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
