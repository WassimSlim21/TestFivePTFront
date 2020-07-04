import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { ApiService } from 'src/app/core/service/api.service';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  @ViewChild('editor', { static: true }) editor: JsonEditorComponent;

  showData;

  options = new JsonEditorOptions();
  files: any ;
  selected: any ;
  data: any ;


  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    this.options.mode = 'code';
    this.options.modes = ['code', 'text', 'tree', 'view'];
    this.options.statusBar = false;
    this.options.onChange = () => {
      console.log(`onChange 1`, this.editor.get());
    //  this.data = this.editor.get();
    };

  }

  showJson(d) {
    return JSON.stringify(d, null, 2);
  }

  changeLog(event = null) {
    this.showData = this.editor.get();
  }
  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles() {
    this.apiService.apiGetAll('layout/names').subscribe( (response: any) => {
      this.files = response ;
    });
  }

  loadFile() {
    this.apiService.apiGetAll(`layout/${this.selected}`).subscribe( (response: any) => {
      this.data = response ;
    });
  }

  updateFile() {

    this.apiService.apiPost(`layout/${this.selected}`, this.editor.get()).subscribe( (response: any) => {
     this.snackBar.open('Layout updated');
    });
  }


}
