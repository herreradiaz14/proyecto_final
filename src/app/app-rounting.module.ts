import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pagina404Component } from "./components/pagina404/pagina404.component";
import { InicioComponent } from "./components/inicio/inicio.component";
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuardGuard } from './components/security/auth.guard.guard';

const routes: Routes = [

  {path: '', redirectTo: '/alumnos/list', pathMatch: 'full'},
  { path: 'login', component: AuthComponent },
  { path: 'alumnos',
    loadChildren: () => import('./features/alumnos/alumnos.module').then((modulo) => modulo.AlumnosModule),
    canLoad: [AuthGuardGuard] },
  { path: 'cursos',
    loadChildren: () => import('./features/cursos/cursos.module').then((modulo) => modulo.CursosModule),
    canLoad: [AuthGuardGuard] },
  {path: '**', component: Pagina404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    initialNavigation: 'enabledBlocking',
  })],
  exports: [RouterModule]
})
export class AppRountingModule { }
