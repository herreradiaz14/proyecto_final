import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaInscripcionesComponent } from "./lista-inscripciones/lista-inscripciones.component";

const routes: Routes = [
  {path: 'inscripciones', children: [
      { path: '**', redirectTo: 'list', pathMatch: 'full' },
      {path: 'list', component: ListaInscripcionesComponent }]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InscripcionesRoutingModule { }
