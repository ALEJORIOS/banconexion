import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { InicioComponent } from './inicio/inicio.component';
import { MetasComponent } from './metas/metas.component';
import { PersonasComponent } from './personas/personas.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { ProgresoComponent } from './progreso/progreso.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "/inicio",
    pathMatch: "full"
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'progreso',
    component: ProgresoComponent
  },
  {
    path: 'metas',
    component: MetasComponent
  },
  {
    path: 'personas',
    component: PersonasComponent
  },
  {
    path: 'transacciones',
    component: TransaccionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
