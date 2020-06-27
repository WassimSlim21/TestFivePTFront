import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import * as smpl from './sample.json';



@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  @ViewChild('editor', { static: true }) editor: JsonEditorComponent;

  showData;

  options = new JsonEditorOptions();
  data: any = {
    products: [{
      name: 'car',
      product: [{
        name: 'honda',
        model: [
          { id: 'civic', name: 'civic' },
          { id: 'accord', name: 'accord' },
          { id: 'crv', name: 'crv' },
          { id: 'pilot', name: 'pilot' },
          { id: 'odyssey', name: 'odyssey' }
        ]
      }]
    }]
  };


  constructor() {
    this.data = smpl ;
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
  }






}
