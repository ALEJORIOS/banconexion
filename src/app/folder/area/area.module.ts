import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaPageRoutingModule } from './area-routing.module';

import { AreaPage } from './area.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PercentPipe } from 'src/app/pipes/percent.pipe';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, AreaPageRoutingModule, ComponentsModule, PercentPipe],
	declarations: [AreaPage],
})
export class AreaPageModule {}
