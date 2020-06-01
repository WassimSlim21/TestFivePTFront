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
import { TagDetailsComponent } from './popup/tag-details/tag-details.component';
import { PackUserListComponent } from './popup/pack-user-list/pack-user-list.component';
import { SocialAccountDetailsComponent } from './popup/social-account-details/social-account-details.component';
import { BenchmarkDetailsComponent } from './popup/benchmark-details/benchmark-details.component';
import { PackDetailsComponent } from './popup/pack-details/pack-details.component';
import { UpdatePackComponent } from './popup/update-pack/update-pack.component';
import { AddPackComponent } from './popup/add-pack/add-pack.component';
import { OwnFileModule } from './pages/own-file/own-file.module';
import { CommentsComponent } from './popup/comments/comments.component';
import { EmojiPickerModule } from 'ng-emoji-picker';
import { FileSelectDirective } from 'ng2-file-upload';
import { AddBugComponent } from './popup/add-bug/add-bug.component';
import { ListUserAssignedBugComponent } from './popup/list-user-assigned-bug/list-user-assigned-bug.component';
import { UpdateAccountRoleComponent } from './popup/update-account-role/update-account-role.component';

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
  CompanyUsersComponent,
  TagDetailsComponent,
  PackUserListComponent,
  SocialAccountDetailsComponent,
  BenchmarkDetailsComponent,
  PackDetailsComponent,
  UpdatePackComponent,
  AddPackComponent,
  CommentsComponent,
  FileSelectDirective,
  AddBugComponent,
  ListUserAssignedBugComponent,
  UpdateAccountRoleComponent

      ],
  imports: [
    EmojiPickerModule,
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
    OwnFileModule

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
    CompanyUsersComponent,
    TagDetailsComponent,
    PackUserListComponent,
    BenchmarkDetailsComponent,
    SocialAccountDetailsComponent,
    PackDetailsComponent,
    UpdatePackComponent,
    AddPackComponent,
    CommentsComponent,
    AddBugComponent,
    ListUserAssignedBugComponent,
    UpdateAccountRoleComponent
      ],
})
export class AppModule { }
export function jwtTokenGetter() {
  return  localStorage.getItem('token');
}
