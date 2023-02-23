import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlumnosComponent } from "./lista-alumnos/lista-alumnos.component";

const routes: Routes = [
  {path: 'alumnos', children: [
      { path: '**', redirectTo: 'list', pathMatch: 'full' },
      {path: 'list', component: ListaAlumnosComponent }]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule{}
