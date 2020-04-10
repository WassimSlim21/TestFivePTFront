import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-update-pack',
  templateUrl: './update-pack.component.html',
  styleUrls: ['./update-pack.component.scss']
})
export class UpdatePackComponent implements OnInit {

  updatePackForm: FormGroup;
  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    this.updatePackForm = new FormGroup({
      pack_name: new FormControl('', Validators.required),
      socialAccounts: new FormControl(0, [, Validators.required]),
      users: new FormControl(0, [Validators.required]),
      benchmarks: new FormControl(0, [, Validators.required]),
      annualSubscription: new FormControl(0, [, Validators.required]),
      maxFansNumber: new FormControl(0, [, Validators.required]),
      dataHistoryYears: new FormControl(0, [, Validators.required]),
      dashboard: new FormControl(false, [, Validators.required]),
      audienceInsights: new FormControl(false, [, Validators.required]),
      trendengagementreports: new FormControl(false, [, Validators.required]),
      customBenchmark: new FormControl(false, [, Validators.required]),
      nationalReports: new FormControl(false, [, Validators.required]),
      competitorContentCuration: new FormControl(false, [, Validators.required]),
      emailReports: new FormControl(false, [, Validators.required]),
      brandingDesign: new FormControl(false, [, Validators.required]),
      mouthlySubcription: new FormControl(0, [, Validators.required]),
      addPage: new FormControl(0, [, Validators.required]),
      addUser: new FormControl(0, [, Validators.required]),
      addBenchmark: new FormControl(0, [, Validators.required]),

    });
}
  ngOnInit() {
  }

}
