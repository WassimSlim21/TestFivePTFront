import { SondageComponent } from './pages/sondage/sondage.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, /* other http imports */HTTP_INTERCEPTORS } from '@angular/common/http';
import {JwtModuleOptions, JwtModule} from '@auth0/angular-jwt';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LayoutsModule } from './layout/layout.module';
import { MaterialModule } from './shared/material.module';
import { HttpConfigInterceptor} from './core/interceptor/httpconfig.interceptor';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { RegisterComponent } from './popup/register/register.component';
import { AddSondageComponent } from './popup/add-sondage/add-sondage.component';
import { AddVoteComponent } from './popup/add-vote/add-vote.component';

const JWT_Module_Options: JwtModuleOptions = ({
  config: {
    tokenGetter: jwtTokenGetter
  }});

@NgModule({
  declarations: [
  AppComponent,
  AdminLayoutComponent,
  RegisterComponent,
  SondageComponent,
  AddSondageComponent,
  AddVoteComponent],
  imports: [

    AngularFontAwesomeModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    LayoutsModule,
    MaterialModule,
    MatSnackBarModule,
    JwtModule.forRoot(JWT_Module_Options),
    SharedModule

    ],
  exports: [
    MaterialModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
],
  bootstrap: [AppComponent]
  ,
  entryComponents:
  [
    RegisterComponent,
    AddVoteComponent,
    AddSondageComponent
      ],
})
export class AppModule { }
export function jwtTokenGetter() {
  return  localStorage.getItem('token');
}
