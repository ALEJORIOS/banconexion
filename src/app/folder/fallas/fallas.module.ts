import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FallasPageRoutingModule } from './fallas-routing.module';

import { FallasPage } from './fallas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FallasPageRoutingModule
  ],
  declarations: [FallasPage]
})
export class FallasPageModule {}
