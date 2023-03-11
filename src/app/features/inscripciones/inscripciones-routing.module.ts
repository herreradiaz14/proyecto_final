import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaInscripcionesComponent } from "./lista-inscripciones/lista-inscripciones.component";
import { AuthGuardGuard } from "../../components/security/auth.guard.guard";

const routes: Routes = [
  {path: '', canActivateChild: [AuthGuardGuard], children: [
      { path: 'list', component: ListaInscripcionesComponent },
      { path:'**', redirectTo: 'list', pathMatch: 'full'}
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InscripcionesRoutingModule { }
