import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ApiService } from 'src/app/core/service/api.service';
import * as moment from 'moment';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  moment = moment ;
  allFiles: any[] = [];
  files: any[] = [];

  constructor(private apiService: ApiService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllFiles();
  }


  getAllFiles() {
    this.apiService.apiGetAll('/file').subscribe((response: any) => {
      this.allFiles = response ;
      console.log('the existing files are ', this.allFiles);
    });
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




}
