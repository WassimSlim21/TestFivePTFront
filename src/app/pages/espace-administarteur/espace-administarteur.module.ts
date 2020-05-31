import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceAdministarteurRoutingModule } from './espace-administarteur-routing.module';
import { EspaceAdministarteurComponent } from './espace-administarteur.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [EspaceAdministarteurComponent],
  imports: [
    CommonModule,
    EspaceAdministarteurRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class EspaceAdministarteurModule { }
