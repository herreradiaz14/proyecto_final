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
import { AbmInscripcionesComponent } from './features/inscripciones/abm-inscripciones/abm-inscripciones.component';
import { ListaInscripcionesComponent } from './features/inscripciones/lista-inscripciones/lista-inscripciones.component';
import { InicioComponent } from './components/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    Pagina404Component,
    AbmInscripcionesComponent,
    ListaInscripcionesComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AlumnosModule,
    CursosModule,
    InscripcionesModule,
    AppRountingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
