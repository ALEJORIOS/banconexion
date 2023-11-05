import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotLlowedPage } from './not-llowed.page';

const routes: Routes = [
  {
    path: '',
    component: NotLlowedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotLlowedPageRoutingModule {}
