import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MatButtonModule, MatRippleModule, MatInputModule, MatFormFieldModule } from '@angular/material';


@NgModule({
  declarations: [UsersComponent, ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  entryComponents:
  [
    ],

})
export class UsersModule { }
