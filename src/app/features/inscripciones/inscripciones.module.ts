import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { ListaInscripcionesComponent } from "./lista-inscripciones/lista-inscripciones.component";
import { AbmInscripcionesComponent } from "./abm-inscripciones/abm-inscripciones.component";
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    ListaInscripcionesComponent,
    AbmInscripcionesComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    ListaInscripcionesComponent
  ]
})
export class InscripcionesModule { }
