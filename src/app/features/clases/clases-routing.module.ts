import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListaClasesComponent} from "./lista-clases/lista-clases.component";

const routes: Routes = [
  {path: 'clases', children: [
      { path: '**', redirectTo: 'list', pathMatch: 'full' },
      {path: 'list', component: ListaClasesComponent }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasesRoutingModule { }
