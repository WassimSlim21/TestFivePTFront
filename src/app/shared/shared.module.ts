import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { ChartsModule } from 'ng2-charts';
import { UserStatsComponent } from '../pages/user-stats/user-stats.component';

@NgModule({
  declarations: [UserStatsComponent],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [
    UserStatsComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    ChartsModule
  ],
})
export class SharedModule {}
