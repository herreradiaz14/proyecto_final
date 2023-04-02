import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AlumnosModule } from './features/alumnos/alumnos.module';
import { CursosModule } from './features/cursos/cursos.module';
import { AppRountingModule } from './app-rounting.module';
import { Pagina404Component } from './components/pagina404/pagina404.component';
import { InscripcionesModule } from './features/inscripciones/inscripciones.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { AuthComponent } from './components/auth/auth.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsuariosModule } from './features/usuarios/usuarios.module';


@NgModule({
  declarations: [
    AppComponent,
    Pagina404Component,
    InicioComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AppRountingModule,
    AlumnosModule,
    CursosModule,
    InscripcionesModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    UsuariosModule
  ],
  exports: [
    MenuComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
