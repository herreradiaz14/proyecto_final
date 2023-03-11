import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from 'src/app/components/security/auth.guard.guard';
import { ListaAlumnosComponent } from "./lista-alumnos/lista-alumnos.component";

const routes: Routes = [
  {path: '', canActivateChild: [AuthGuardGuard], children: [ 
      {path: 'list', component: ListaAlumnosComponent },
      { path:'**', redirectTo: 'list'},
      ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule{}
