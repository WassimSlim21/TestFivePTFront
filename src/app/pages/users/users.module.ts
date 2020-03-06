import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [UsersComponent, ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
    ChartsModule

  ]
})
export class UsersModule { }
