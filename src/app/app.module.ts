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
import { AdminLayoutModule } from './layout/admin-layout/admin-layout.module';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';



const JWT_Module_Options: JwtModuleOptions = ({
  config: {
    tokenGetter: jwtTokenGetter
  }});

@NgModule({
  declarations: [
    AppComponent,
  AdminLayoutComponent  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    LayoutsModule,
    MaterialModule,
    MatSnackBarModule,
    JwtModule.forRoot(JWT_Module_Options),
    ButtonsModule,

  ],
  exports: [
    MaterialModule


  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function jwtTokenGetter() {
  return  localStorage.getItem('token');
}
