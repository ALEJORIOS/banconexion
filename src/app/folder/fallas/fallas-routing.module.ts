import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FallasPage } from './fallas.page';

const routes: Routes = [
  {
    path: '',
    component: FallasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FallasPageRoutingModule {}
