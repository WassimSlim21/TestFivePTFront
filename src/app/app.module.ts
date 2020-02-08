import { LayoutComponent } from './layout/layout/layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, /* other http imports */ } from '@angular/common/http';
import {JwtModuleOptions, JwtModule} from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LayoutsModule } from './layout/layout.module';
import { MaterialModule } from './shared/material.module';


const JWT_Module_Options: JwtModuleOptions = ({
  config: {
    tokenGetter: jwtTokenGetter
  }});

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    LayoutsModule,
    MaterialModule,
    JwtModule.forRoot(JWT_Module_Options)

  ],
  exports: [
    MaterialModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function jwtTokenGetter() {
  return  localStorage.getItem('token');
}
