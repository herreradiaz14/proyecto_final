import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pagina404Component } from "./components/pagina404/pagina404.component";
import { InicioComponent } from "./components/inicio/inicio.component";

const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: '**', component: Pagina404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRountingModule { }
