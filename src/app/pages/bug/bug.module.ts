import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BugRoutingModule } from './bug-routing.module';
import { BugComponent } from './bug.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
<<<<<<< HEAD
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialModule } from 'src/app/shared/material.module';
=======
>>>>>>> 07d92c6f2dd3a18b51788c210d2b150c03c18f18


@NgModule({
  declarations: [BugComponent],
  imports: [
    CommonModule,
    BugRoutingModule,
<<<<<<< HEAD
    MaterialModule,
    DragDropModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }, ],
=======
    DragDropModule
  ]
>>>>>>> 07d92c6f2dd3a18b51788c210d2b150c03c18f18
})
export class BugModule { }
