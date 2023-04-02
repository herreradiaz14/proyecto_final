import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AlumnoStateEffects } from './state/alumno-state.effects';
import { StoreModule } from "@ngrx/store";
import { alumnoStateFeatureKey, reducer } from "./state/alumno-state.reducer";


@NgModule({
  declarations: [
    ListaAlumnosComponent,
    AbmAlumnosComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forFeature(alumnoStateFeatureKey, reducer),
    EffectsModule.forFeature([AlumnoStateEffects])
  ],
  exports: [
    ListaAlumnosComponent
  ],
})
export class AlumnosModule { }
