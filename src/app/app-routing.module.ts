import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';


const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
    ]
  },
  {
    path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },

  { path: '', loadChildren: () => import('./layout/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule) },
  { path: 'sondage', loadChildren: () => import('./pages/sondage/sondage.module').then(m => m.SondageModule) },


];

@NgModule({
  imports: [    RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
