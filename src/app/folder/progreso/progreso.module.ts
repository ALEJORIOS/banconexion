import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgresoPageRoutingModule } from './progreso-routing.module';

import { ProgresoPage } from './progreso.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PercentPipe } from 'src/app/pipes/percent.pipe';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, ProgresoPageRoutingModule, ComponentsModule, PercentPipe],
	declarations: [ProgresoPage],
})
export class ProgresoPageModule {}
