import { LayoutComponent } from './layout/layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) },
      { path: 'tags', loadChildren: () => import('./pages/tags/tags.module').then(m => m.TagsModule) },
    ]
  },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },

  {
    path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
