import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-add-sondage',
  templateUrl: './add-sondage.component.html',
  styleUrls: ['./add-sondage.component.scss']
})
export class AddSondageComponent implements OnInit {

  votes;
  constructor(public dialogRef: MatDialogRef<AddSondageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService) { }

  ngOnInit(): void {
    console.log(this.data);

    this.loadVotes();
  }
  loadVotes(): void {
    this.apiService.apiGetAll('vote/getBySondageId?id=' + this.data.sondageid).subscribe(
      (result: any) => {
        if (result) {
          this.votes = result;
          console.log('votes : ', this.votes);
        }
      }
    );
  }
}
