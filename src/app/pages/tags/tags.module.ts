import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TagsComponent],
  imports: [
    CommonModule,
    TagsRoutingModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class TagsModule { }
