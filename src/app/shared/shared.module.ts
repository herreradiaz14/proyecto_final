import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DirectivaPrincipalDirective } from './directivas/directiva-principal.directive';
import { NombreApellidoPipe } from './pipes/nombre-apellido.pipe';
import { BooleanTextoPipe } from './pipes/boolean-texto.pipe';

@NgModule({
  declarations: [
    DirectivaPrincipalDirective,
    NombreApellidoPipe,
    BooleanTextoPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivaPrincipalDirective,
    NombreApellidoPipe,
    BooleanTextoPipe
  ]
})
export class SharedModule { }
