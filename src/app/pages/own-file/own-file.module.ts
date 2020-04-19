import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnFileRoutingModule } from './own-file-routing.module';
import { OwnFileComponent } from './own-file.component';


@NgModule({
  declarations: [OwnFileComponent],
  imports: [
    CommonModule,
    OwnFileRoutingModule
  ]
})
export class OwnFileModule { }
