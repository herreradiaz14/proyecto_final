import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from 'src/app/components/security/auth.guard.guard';
import {ListaCursosComponent} from "./lista-cursos/lista-cursos.component";

const routes: Routes = [
  {path: '', canActivateChild: [AuthGuardGuard], children: [
      { path: 'list', component: ListaCursosComponent },
      { path:'**', redirectTo: 'list'},
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule{}
