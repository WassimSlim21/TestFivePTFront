import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { ApiService } from 'src/app/core/service/api.service';
import * as moment from 'moment';
import { HttpHeaders } from '@angular/common/http';
import { CommentsComponent } from 'src/app/popup/comments/comments.component';


@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  moment = moment ;
  allFiles: any[] = [];
  files: any[] = [];
  filesChoice: string;
  id: any;

  constructor(private apiService: ApiService, public dialog: MatDialog,
              public dialogRef: MatDialogRef<FileComponent>, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('account'))._id ;
    this.getAllFiles();
  }


  getAllFiles() {
    this.apiService.apiGetAll('/file').subscribe((response: any) => {
      this.allFiles = response ;
      if (this.allFiles) {
      this.allFiles.forEach(element => {
        if ( element.account_id._id ===  (JSON.parse(localStorage.getItem('account'))._id)) {
            element.deletable = true ;
         } else {
          element.deletable = false ;
         }
      });
      console.log('the existing files are ', this.allFiles);
    }
    });
  }

  getMyFiles() {
    this.apiService.apiGetAll(`/file/${this.id}`).subscribe((response: any) => {
      this.allFiles = response;
      if (this.allFiles ) {
      this.allFiles.forEach(element => {
          element.deletable = true ;
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
// this.files.forEach(element => {
  const formData = new FormData();
  formData.append('account_id', (JSON.parse(localStorage.getItem('account'))._id));
  this.files.forEach(file => {
    formData.append('files', file, file.name);
  });
  const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Headers': 'Authorization'
    })
  };

  this.apiService.apiPostWithOptions('/file/add', formData, httpOptions).subscribe(response => {
    console.log(response);
  });
// });
}

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
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

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
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




  deleteFileById(file: any){
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
      height : 'auto' ,
      width : 'auto',

      data: {
        fileId: id
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
