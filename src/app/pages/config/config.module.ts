import { CommonModule } from '@angular/common';
import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './config.component';
import { NgModule } from '@angular/core';
import { NgJsonEditorModule } from 'ang-jsoneditor';



@NgModule({
  declarations: [ConfigComponent],
  imports: [
    NgJsonEditorModule,
    CommonModule,
    ConfigRoutingModule,

  ]
})
export class ConfigModule { }
