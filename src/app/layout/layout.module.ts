import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';



@NgModule({
  declarations: [HeaderComponent, SidebarComponent ],
  imports: [
    CommonModule,
  ],
  exports: [HeaderComponent, SidebarComponent ]
})
export class LayoutsModule { }
