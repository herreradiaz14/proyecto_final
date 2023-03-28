import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInscripcionesComponent } from './lista-inscripciones.component';
import {AbmInscripcionesComponent} from "../abm-inscripciones/abm-inscripciones.component";

describe('ListaInscripcionesComponent', () => {
  let component: ListaInscripcionesComponent;
  let fixture: ComponentFixture<ListaInscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaInscripcionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ListaInscripcionesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(ListaInscripcionesComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-unit-test!');
  });
});
