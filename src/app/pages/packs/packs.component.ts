import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { ApiService } from 'src/app/core/service/api.service';


@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.scss']
})
export class PacksComponent implements OnInit {
  isLoading = true ;
  public packs: any[];
  constructor(private apiService: ApiService) { }

  ngOnInit() {

    this.getPacks();
  }

  getPacks() {
    this.apiService.apiGetAll('/pack').subscribe(
      (response: any) => {
        if (response) {
          console.log(response);
          this.isLoading = false;
          this.packs = response ;

        }
      },
    error => {
      console.log(error);
    });

  }

}
