import { Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { LayoutModule } from '@angular/cdk/layout';
export const AdminLayoutRoutes: Routes = [
  {
    path: '', component: LayoutModule, canActivate: [AuthGuardService],
    children: [
      { path: 'users', loadChildren: () => import('../../pages/users/users.module').then(m => m.UsersModule) },
      { path: 'tags', loadChildren: () => import('../../pages/tags/tags.module').then(m => m.TagsModule) },
    ]
  }
  ];

export class AdminRoutingModule { }
