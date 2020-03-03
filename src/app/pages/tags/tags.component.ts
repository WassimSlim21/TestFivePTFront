import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Tag } from 'src/app/core/models/tag';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import { MatDialog, PageEvent, MatChipInputEvent } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import {COMMA, ENTER} from '@angular/cdk/keycodes';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  /* Synonyms Ships input variables */
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];



  displayedColumns: string[] = ['select', 'name', 'synonyms', 'type', 'updated_at', 'social_accounts' ];
  dataSource = new MatTableDataSource<Tag>();
  selection = new SelectionModel<Tag>(true, []);
  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize = 5;
  length: number;
  pageSizeOptions: number[] = [5, 10];
  moment = moment;
  tags: any[] = [];


  constructor(private apiService: ApiService, private router: Router, public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit() {
    this.getTags(1);
  }



  getTags(page) {

    this.apiService.apiGetAll('/tag?pageNo=' + page + '&size=' + this.pageSize).subscribe(
      (response: any) => {
        if (response) {
          response.tags.forEach(element => {
            if (element.synonyms) {
              element.synonyms = element.synonyms.split(',');
               } else {
                element.synonyms = [];
               }
          });
          this.length = response.total;
          this.pageIndex = response.pageIndex;
          this.tags = response.tags;

          this.dataSource = new MatTableDataSource<Tag>(this.tags);

          console.log('tags', response);
        }
      },
    error => {
      console.log(error);
    });
  }









  onPaginateChange(event?: PageEvent) {
    this.pageSize = event.pageSize;
    if (event.pageIndex < 1) {
      event.pageIndex = event.pageIndex + 1;
    }
    this.getTags(event.pageIndex);
  }


  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }



  /* Synonyms Ships input methods */

  add(event: MatChipInputEvent, element: any): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      element.synonyms.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(element: any, synonym: any): void {
    const index = element.synonyms.indexOf(synonym);

    if (index >= 0) {
     element.synonyms.splice(index, 1);
    }
  }
}


