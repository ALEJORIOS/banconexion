import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { InicioComponent } from './inicio/inicio.component';
import { MetasComponent } from './metas/metas.component';
import { PersonasComponent } from './personas/personas.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "/inicio",
    pathMatch: "full"
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
  },
  {
    path: 'progreso',
    loadChildren: () => import('./progreso/progreso.module').then( m => m.ProgresoPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
