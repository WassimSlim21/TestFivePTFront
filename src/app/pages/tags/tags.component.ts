
import { TagDetailsComponent } from 'src/app/popup/tag-details/tag-details.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Tag } from 'src/app/core/models/tag';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PageEvent, MatChipInputEvent, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ConfirmDialogModel, ComfirmDialogComponent } from 'src/app/popup/comfirm-dialog/comfirm-dialog.component';
import { UserDetailsComponent } from 'src/app/popup/user-details/user-details.component';
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
  tr = true ;
  isLoading = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  filterForm: FormGroup;
  displayedColumns: string[] = ['select', 'name', 'synonyms', 'type', 'updated_at', 'social_accounts', 'star' ];
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
  tagTypes = [{
    value: '0',
    name: 'Sector',
  }, {
    value: '1',
    name: 'Country',
  }, {
    value: '2',
    name: 'Provider',
  }];
  result: any;
  constructor(private apiService: ApiService, private router: Router, public dialog: MatDialog, private fb: FormBuilder,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ComfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, ) { }
  ngOnInit() {
    this.getTags(1);
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
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(TagDetailsComponent, {
      width: '250px'    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
getTags(page) {
    this.apiService.apiGetAll('/tag?pageNo=' + page + '&size=' + this.pageSize).subscribe(
      (response: any) => {
        if (response) {
          this.isLoading = false;
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
  comfirmDialog(tag: any): void {
    const message = `Are you sure you want to do this?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      const index = this.tags.indexOf(tag);
      if ( this.result === true) {
        this.apiService.apiDelete(`/tag/${tag._id}`).subscribe(
          (response: any) => {
            console.log('delete' + response);
            this.snackBar.open(JSON.stringify(response.message));
            this.getTags(this.pageIndex);
          }
      );
        this.dialogRef.close();
    }
    });
  }
}
