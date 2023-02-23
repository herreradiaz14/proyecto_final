import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListaCursosComponent} from "./lista-cursos/lista-cursos.component";

const routes: Routes = [
  {path: 'cursos', children: [
      { path: '**', redirectTo: 'list', pathMatch: 'full' },
      {path: 'list', component: ListaCursosComponent }]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule{}
