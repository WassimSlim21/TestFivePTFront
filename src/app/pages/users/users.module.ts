import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserStatsComponent } from '../user-stats/user-stats.component';


@NgModule({
  declarations: [UsersComponent, UserStatsComponent ],
  imports: [
    UsersRoutingModule,
    SharedModule
  ],
  exports: [UserStatsComponent]

})
export class UsersModule { }
