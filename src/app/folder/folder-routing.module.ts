import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetasComponent } from './metas/metas.component';
import { PersonasComponent } from './personas/personas.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { AuthGuard } from '../guards/auth.guard';
import { LoginGuard } from '../guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: "/inicio",
    pathMatch: "full"
  },
  {
    path: 'metas',
    component: MetasComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'personas',
    component: PersonasComponent,
    canActivate: [LoginGuard, AuthGuard]
  },
  {
    path: 'transacciones',
    component: TransaccionesComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'progreso',
    loadChildren: () => import('./progreso/progreso.module').then( m => m.ProgresoPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'fallas',
    loadChildren: () => import('./fallas/fallas.module').then( m => m.FallasPageModule),
    canActivate: [LoginGuard, AuthGuard]
  },
  {
    path: 'area/:area',
    loadChildren: () => import('./area/area.module').then( m => m.AreaPageModule),
    canActivate: [LoginGuard, AuthGuard]
  },
  {
    path: 'panel',
    loadChildren: () => import('./panel/panel.module').then( m => m.PanelPageModule),
    canActivate: [LoginGuard, AuthGuard]
  },
  {
    path: 'not-allowed',
    loadChildren: () => import('./not-llowed/not-llowed.module').then( m => m.NotLlowedPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule),
    canActivate: [LoginGuard]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
