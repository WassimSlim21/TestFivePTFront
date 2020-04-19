import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnFileComponent } from './own-file.component';

const routes: Routes = [{ path: '', component: OwnFileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnFileRoutingModule { }
