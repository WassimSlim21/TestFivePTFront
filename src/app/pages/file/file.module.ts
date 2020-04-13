import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileRoutingModule } from './file-routing.module';
import { FileComponent } from './file.component';


@NgModule({
  declarations: [FileComponent],
  imports: [
    CommonModule,
    FileRoutingModule
  ]
})
export class FileModule { }
