import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { PbarComponent } from './pbar/pbar.component';



@NgModule({
  declarations: [AlertsComponent, PbarComponent],
  imports: [
    CommonModule
  ],
  exports: [AlertsComponent, PbarComponent]
})
export class ComponentsModule { }
