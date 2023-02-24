import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from "./material.module";

@NgModule({
  declarations: [
    NavbarComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent,
    ToolbarComponent,
    MaterialModule
  ]
})
export class CoreModule { }
