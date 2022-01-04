import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SondageRoutingModule } from './sondage-routing.module';
import { SondageComponent } from './sondage.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SondageComponent],
  imports: [
    SharedModule,
    CommonModule,
    SondageRoutingModule
  ]
})
export class SondageModule { }
