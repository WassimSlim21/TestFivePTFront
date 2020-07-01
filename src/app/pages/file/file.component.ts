import { Component, OnInit, ViewChild, EventEmitter, Output, Input, Inject, ElementRef } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { ApiService } from 'src/app/core/service/api.service';
import * as moment from 'moment';
import { HttpHeaders, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { CommentsComponent } from 'src/app/popup/comments/comments.component';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  moment = moment;
  allFiles: any[] = [];
  files: any[] = [];
  filterForm: FormGroup;
  @Output() listChange = new EventEmitter<string[]>();
  filesChoice: string;
  id: any;
  isLoading = true;
  openPopup: Function;
  myText: any = '';

  constructor(private apiService: ApiService, public dialog: MatDialog, private fb: FormBuilder,
              public dialogRef: MatDialogRef<FileComponent>, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('account'))._id;
    this.getAllFiles();
    this.filterForm = this.fb.group({
      name: new FormControl(),
    });
    this.filterForm.valueChanges.subscribe(value => {
      this.listChange.emit(value);
      console.log('filter', value);
      this.getFilteredFile(value);
    });
  }

  setPopupAction(fn: any) {
    console.log('setPopupAction');
    this.openPopup = fn;
  }
  getFilteredFile(value: any) {
    this.apiService.apiPost('/file/search', value).subscribe(
      (response: any) => {
        if (response) {
          this.isLoading = false;
          this.allFiles = response;
        }
      },
      error => {
        console.log(error);
      });
  }


  getAllFiles() {
    this.apiService.apiGetAll('/file').subscribe((response: any) => {
      this.allFiles = response;
      if (this.allFiles) {
        this.allFiles.forEach(element => {
          if (element.account_id) {
            if (element.account_id._id === (JSON.parse(localStorage.getItem('account'))._id)) {
              element.deletable = true;
            } else {
              element.deletable = false;
            }
          }
        });
        console.log('the existing files are ', this.allFiles);
      }
    });
  }

  getMyFiles() {
    this.apiService.apiGetAll(`/file/${this.id}`).subscribe((response: any) => {
      this.allFiles = response;
      if (this.allFiles) {
        this.allFiles.forEach(element => {
          element.deletable = true;
        });
        console.log('the existing files are ', this.allFiles);
      }
    });
  }

  ChoiceselectionChange(event) {
    console.log(event.value);
    if (event.value === '0') {
      this.getAllFiles();
    } else {
      this.getMyFiles();
    }
  }


  uploadFile() {
    console.log(this.files);
    const formData = new FormData();
    formData.append('account_id', (JSON.parse(localStorage.getItem('account'))._id));
    this.files.forEach(file => {
        formData.append('files', file, file.name);
      });

    this.apiService.apiPostWithOptions('/file/add', formData).subscribe(response => {
      console.log(response);
      this.getAllFiles();
      this.apiService.apiPost('/notification/',
      {source_id : JSON.parse(localStorage.getItem('account'))._id,
       content : `New file uploaded by ${JSON.parse(localStorage.getItem('account')).userName}`})
       .subscribe(rep => {
        console.log('notifiier :', rep);
      });
    });
    }


  // uploadFile(file) {
  //   const formData = new FormData();
  //   formData.append('file', file.data);
  //   formData.append('account_id', (JSON.parse(localStorage.getItem('account'))._id));
  //   file.inProgress = true;
  //   this.apiService.upload('/file/add', formData).pipe(map(event => {
  //       switch (event.type) {
  //         case HttpEventType.UploadProgress:
  //           file.progress = Math.round(event.loaded * 100 / event.total);
  //           break;
  //         case HttpEventType.Response:
  //           return event;
  //       }
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       file.inProgress = false;
  //       return of(`${file.data.name} upload failed.`);
  //     })).subscribe((event: any) => {
  //       if (typeof (event) === 'object') {
  //         console.log(event.body);
  //       }
  //     });
  // }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    console.log("event", $event);
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event) {
    console.log("filepicked", event.target.files);
    // for (let i = 0; i<files.length; i++) {
    //   const reader = new FileReader();
    //   // reader.onload = (event: any) => {

    //   // }
    //   reader.readAsDataURL(files[i]);
    // }
    this.files = Array.from((event.target as HTMLInputElement).files);

    // this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
    console.log('files : ', this.files);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }




  deleteFileById(file: any) {
    this.apiService.apiDelete(`/file/${file._id}`).subscribe((response: any) => {
      console.log(response);

      const index = this.allFiles.indexOf(file, 0);
      if (index > -1) {
        this.allFiles.splice(index, 1);
        this.snackBar.open(JSON.stringify(response.message));
      }
    });

  }


  openDialog(id): void {
    const dialogRef = this.dialog.open(CommentsComponent, {
      disableClose: false,
      height: 'auto',
      width: 'auto',

      data: {
        fileId: id
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



}
