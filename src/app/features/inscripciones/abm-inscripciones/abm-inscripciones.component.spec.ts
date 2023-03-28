import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmInscripcionesComponent } from './abm-inscripciones.component';
import {ListaCursosComponent} from "../../cursos/lista-cursos/lista-cursos.component";

describe('AbmInscripcionesComponent', () => {
  let component: AbmInscripcionesComponent;
  let fixture: ComponentFixture<AbmInscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmInscripcionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AbmInscripcionesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AbmInscripcionesComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-unit-test!');
  });
});
