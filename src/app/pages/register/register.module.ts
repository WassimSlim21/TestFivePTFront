import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';



import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,

} from '@angular/material';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AccountService } from 'src/app/core/service/account.service';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    FormsModule, ReactiveFormsModule,
    CommonModule,
    RegisterRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatRadioModule
  ],
  providers: [
    AccountService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ]
})
export class RegisterModule { }
