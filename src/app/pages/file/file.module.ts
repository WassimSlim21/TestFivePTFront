import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileRoutingModule } from './file-routing.module';
import { FileComponent } from './file.component';
import { ProgressComponent } from 'src/app/layout/progress/progress.component';


@NgModule({
  declarations: [FileComponent, ProgressComponent],
  imports: [
    CommonModule,
    FileRoutingModule
  ]
})
export class FileModule { }
