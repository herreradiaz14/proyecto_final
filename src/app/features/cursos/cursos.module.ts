import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { ListaCursosComponent } from "./lista-cursos/lista-cursos.component";
import { AbmCursosComponent } from "./abm-cursos/abm-cursos.component";
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    ListaCursosComponent,
    AbmCursosComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    CoreModule,
    SharedModule
  ],
  exports: [
    ListaCursosComponent
  ]
})
export class CursosModule { }
