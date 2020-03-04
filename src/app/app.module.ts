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
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { UserDetailsComponent } from 'src/app/popup/user-details/user-details.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ComfirmDialogComponent } from './popup/comfirm-dialog/comfirm-dialog.component';
import { CompanyModule } from './pages/company/company.module';
import { CompanyUsersComponent } from './popup/company-users/company-users.component';



const JWT_Module_Options: JwtModuleOptions = ({
  config: {
    tokenGetter: jwtTokenGetter
  }});

@NgModule({
  declarations: [
    UserDetailsComponent,
    AppComponent,
  AdminLayoutComponent,
  ComfirmDialogComponent,
  CompanyUsersComponent  ],
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
    CompanyModule,


  ],
  exports: [
    MaterialModule


  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
],
  bootstrap: [AppComponent]
  ,
  entryComponents:
  [ UserDetailsComponent,
    ComfirmDialogComponent,
    CompanyUsersComponent
    ],
})
export class AppModule { }
export function jwtTokenGetter() {
  return  localStorage.getItem('token');
}
