import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';


const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) },
      { path: 'companys', loadChildren: () => import('./pages/company/company.module').then(m => m.CompanyModule) },

      { path: 'tags', loadChildren: () => import('./pages/tags/tags.module').then(m => m.TagsModule) },
    ]
  },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },

  {
    path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  { path: '', loadChildren: () => import('./layout/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule) },
  { path: 'company', loadChildren: () => import('./pages/company/company.module').then(m => m.CompanyModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
