import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { EditProfilepopupComponent } from '../popup/editprofile/edit-profilepopup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [HeaderComponent, SidebarComponent, EditProfilepopupComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  entryComponents:[ EditProfilepopupComponent ],
  exports: [HeaderComponent, SidebarComponent]
})

export class LayoutsModule { }
