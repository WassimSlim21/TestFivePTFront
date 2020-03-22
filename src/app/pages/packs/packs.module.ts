import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacksRoutingModule } from './packs-routing.module';
import { PacksComponent } from './packs.component';
import { MaterialModule } from 'src/app/shared/material.module';


@NgModule({
  declarations: [PacksComponent],
  imports: [
    CommonModule,
    PacksRoutingModule,
    MaterialModule
  ]
})
export class PacksModule { }
