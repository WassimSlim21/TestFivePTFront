import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MaterialModule } from 'src/app/shared/material.module';
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
