import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FileRoutingModule } from './file-routing.module';
import { FileComponent } from './file.component';
import { ProgressComponent } from 'src/app/layout/progress/progress.component';
import { MaterialModule } from 'src/app/shared/material.module';


@NgModule({
  declarations: [FileComponent, ProgressComponent],
  imports: [
    CommonModule,
    FileRoutingModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class FileModule { }
