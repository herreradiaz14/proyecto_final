import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { ListaCursosComponent } from "./lista-cursos/lista-cursos.component";
import { AbmCursosComponent } from "./abm-cursos/abm-cursos.component";
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { CursoStateEffects } from './state/curso-state.effects';
import { StoreModule } from "@ngrx/store";
import { cursoStateFeatureKey, reducer } from "./state/curso-state.reducer";


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
    HttpClientModule,
    StoreModule.forFeature(cursoStateFeatureKey, reducer),
    EffectsModule.forFeature([CursoStateEffects])
  ],
  exports: [
    ListaCursosComponent,
    MenuComponent
  ]
})
export class CursosModule { }
