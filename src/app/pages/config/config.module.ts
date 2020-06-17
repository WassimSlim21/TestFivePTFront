import { CommonModule } from '@angular/common';
import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './config.component';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [ConfigComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule,

  ]
})
export class ConfigModule { }
