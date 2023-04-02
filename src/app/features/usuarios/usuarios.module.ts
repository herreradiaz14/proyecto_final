import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { AbmUsuariosComponent } from './abm-usuarios/abm-usuarios.component';
import { UsuariosRoutingModule } from "./usuarios-routing.module";
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { EffectsModule } from '@ngrx/effects';
import { UsuarioStateEffects } from './state/usuario-state.effects';
import { StoreModule} from "@ngrx/store";
import { usuarioStateFeatureKey, reducer } from "./state/usuario-state.reducer";


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
    HttpClientModule,
    StoreModule.forFeature(usuarioStateFeatureKey, reducer),
    EffectsModule.forFeature([UsuarioStateEffects])
  ],
  exports: [
    ListaUsuariosComponent
  ]
})
export class UsuariosModule { }
