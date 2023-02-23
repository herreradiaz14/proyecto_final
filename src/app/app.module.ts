import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListaClasesComponent } from './features/clases/lista-clases/lista-clases.component';
import { AbmClasesComponent } from './features/clases/abm-clases/abm-clases.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AlumnosModule } from './features/alumnos/alumnos.module';
import { CursosModule } from './features/cursos/cursos.module';
import { ClasesModule } from './features/clases/clases.module';
import { AppRountingModule } from './app-rounting.module';
import { Pagina404Component } from './components/pagina404/pagina404.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaClasesComponent,
    AbmClasesComponent,
    Pagina404Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AlumnosModule,
    CursosModule,
    ClasesModule,
    AppRountingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
