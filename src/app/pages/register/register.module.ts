import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { ApiService } from 'src/app/core/service/api.service';


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

    MatButtonToggleModule,
    MatRadioModule
  ],
  providers: [
    ApiService,
  ]
})
export class RegisterModule { }
