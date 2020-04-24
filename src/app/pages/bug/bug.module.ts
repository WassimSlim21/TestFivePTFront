import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BugRoutingModule } from './bug-routing.module';
import { BugComponent } from './bug.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [BugComponent],
  imports: [
    CommonModule,
    BugRoutingModule,
    DragDropModule
  ]
})
export class BugModule { }
