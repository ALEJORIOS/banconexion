import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { ProgresoComponent } from './progreso/progreso.component';
import { MetasComponent } from './metas/metas.component';
import { PersonasComponent } from './personas/personas.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { InicioComponent } from './inicio/inicio.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FolderPageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    FolderPage,
    ProgresoComponent,
    MetasComponent,
    PersonasComponent,
    TransaccionesComponent,
    InicioComponent
  ]
})
export class FolderPageModule {}
