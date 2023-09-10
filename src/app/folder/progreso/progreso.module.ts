import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgresoPageRoutingModule } from './progreso-routing.module';

import { ProgresoPage } from './progreso.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgresoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProgresoPage]
})
export class ProgresoPageModule {}
