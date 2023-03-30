import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { AbmUsuariosComponent } from './abm-usuarios/abm-usuarios.component';
import { UsuariosRoutingModule } from "./usuarios-routing.module";
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    ListaUsuariosComponent,
    AbmUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    ListaUsuariosComponent
  ]
})
export class UsuariosModule { }
