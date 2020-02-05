import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { EditProfilepopupComponent } from '../popup/editprofile/edit-profilepopup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCommonModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';


@NgModule({
  declarations: [HeaderComponent, SidebarComponent, EditProfilepopupComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule,
    MatButtonModule,
    MatCommonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  entryComponents:[EditProfilepopupComponent],
  exports: [HeaderComponent, SidebarComponent,]
})
export class LayoutsModule { }
