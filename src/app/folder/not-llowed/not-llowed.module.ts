import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotLlowedPageRoutingModule } from './not-llowed-routing.module';

import { NotLlowedPage } from './not-llowed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotLlowedPageRoutingModule
  ],
  declarations: [NotLlowedPage]
})
export class NotLlowedPageModule {}
