import { CommonModule } from '@angular/common';
import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './config.component';
import { NgModule } from '@angular/core';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { MaterialModule } from 'src/app/shared/material.module';



@NgModule({
  declarations: [ConfigComponent],
  imports: [
    NgJsonEditorModule,
    CommonModule,
    ConfigRoutingModule,
    MaterialModule

  ]
})
export class ConfigModule { }
