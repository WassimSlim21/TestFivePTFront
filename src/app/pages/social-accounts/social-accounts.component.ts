import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, PageEvent, MatDialog } from '@angular/material';
import * as moment from 'moment';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import { SocialAccount } from 'src/app/core/models/social_account';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-social-accounts',
  templateUrl: './social-accounts.component.html',
  styleUrls: ['./social-accounts.component.scss']
})
export class SocialAccountsComponent implements OnInit {
  isLoading = false;
  filterForm: FormGroup = new FormGroup({
    name: new FormControl(),
    tagCtrl: new FormControl()
  });
  displayedColumns: string[] = ['cover', 'remote_id',  'title', 'provider', 'flagged_at', 'flagged_cause', 'created_at', 'updated_at'];
  dataSource: any;
  socialAccounts: SocialAccount[] = [];

  selectedOption: string;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize = 5;
  length: number;
  pageSizeOptions: number[] = [5, 10];
 moment = moment;

  /* -------------tag auto complete variables ------------*/

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags: Observable<string[]>;
  tags: string[] = ['Lemon'];
  allTags: any[] = ['adqsd', 'qqdqsdqs', 'qsdqsdqsd'];


  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto',  {static: false}) matAutocomplete: MatAutocomplete;
  constructor(private socialAccountService: ApiService, private router: Router, public dialog: MatDialog, private fb: FormBuilder) {

    this.filteredTags = this.filterForm.controls.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));

   }

  ngOnInit() {
    this.getSocialAccounts(1);
    this.getAllTags();



    this.filterForm.valueChanges.subscribe(value => {

      console.log('filter', value);
      console.log('tags', this.tags);
      // this.getFilteredSocialAccounts(value);

    });
  }


  getAllTags() {
    this.socialAccountService.apiGetAll('/tag/all').subscribe(
      (data: any) => {
        if (data) {
          this.allTags = data ;
        }
      },
    error => {
      console.log(error);
    });
  }

  getSocialAccounts(page) {

    this.socialAccountService.apiGetAll('/socialAccount?pageNo=' + page + '&size=' + this.pageSize).subscribe(
      (data: any) => {
        if (data) {
          this.isLoading = false;

          this.length = data.total;
          this.pageIndex = data.pageIndex;
          this.socialAccounts = data.social_accounts;
          this.dataSource = new MatTableDataSource<SocialAccount>(this.socialAccounts);
          console.log('social_accounts', this.socialAccounts);
        }
      },
    error => {
      console.log(error);
    });
  }




  // Pagination Methods
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
    this.getSocialAccounts(event.pageIndex);
  }


    /* ----------------------- Tag input Autocomplete ------------------ */
    add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }


      this.filterForm.controls.tagCtrl.setValue(null);
    }

    remove(tag: string): void {
      const index = this.tags.indexOf(tag);

      if (index >= 0) {
        this.tags.splice(index, 1);
      }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
      this.tags.push(event.option.viewValue);
      this.tagInput.nativeElement.value = '';
      this.filterForm.controls.tagCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
    }


}
