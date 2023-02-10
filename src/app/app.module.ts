import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './componentes/header/navbar/navbar.component';
import { ToolbarComponent } from './componentes/header/toolbar/toolbar.component';
import { ListaAlumnosComponent } from './componentes/alumnos/lista-alumnos/lista-alumnos.component';
import { AbmAlumnosComponent } from './componentes/alumnos/abm-alumnos/abm-alumnos.component';
import { MaterialModule } from "./material.module";
import { NombreApellidoPipe } from './pipes/nombre-apellido.pipe';
import { BooleanTextoPipe } from './pipes/boolean-texto.pipe';
import { DirectivaPrincipalDirective } from './directivas/directiva-principal.directive';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListaClasesComponent } from './componentes/clases/lista-clases/lista-clases.component';
import { AbmClasesComponent } from './componentes/clases/abm-clases/abm-clases.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ToolbarComponent,
    ListaAlumnosComponent,
    AbmAlumnosComponent,
    NombreApellidoPipe,
    BooleanTextoPipe,
    DirectivaPrincipalDirective,
    ListaClasesComponent,
    AbmClasesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
