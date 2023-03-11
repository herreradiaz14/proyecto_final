import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { ListaCursosComponent } from "./lista-cursos/lista-cursos.component";
import { AbmCursosComponent } from "./abm-cursos/abm-cursos.component";
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ListaCursosComponent,
    AbmCursosComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    ListaCursosComponent,
    MenuComponent
  ]
})
export class CursosModule { }
