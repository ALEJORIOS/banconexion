import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { PbarComponent } from './pbar/pbar.component';
import { PercentPipe } from '../pipes/percent.pipe';

@NgModule({
	declarations: [AlertsComponent, PbarComponent],
	imports: [CommonModule, PercentPipe],
	exports: [AlertsComponent, PbarComponent],
})
export class ComponentsModule {}
