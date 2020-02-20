import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MatPaginatorModule } from '@angular/material';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatButtonModule, MatRippleModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsersComponent, ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,

  ]
})
export class UsersModule { }
