import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileRoutingModule } from './file-routing.module';
import { FileComponent } from './file.component';
import { ProgressComponent } from 'src/app/layout/progress/progress.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmojiPickerModule } from 'ng-emoji-picker';


@NgModule({
  declarations: [FileComponent, ProgressComponent],
  imports: [
    CommonModule,
    FileRoutingModule,
    MaterialModule,
    PickerModule, EmojiPickerModule,
    FormsModule, ReactiveFormsModule,

  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }, ],
})
export class FileModule { }
