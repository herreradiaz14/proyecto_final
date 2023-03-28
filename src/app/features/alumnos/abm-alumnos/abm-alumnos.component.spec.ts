import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmAlumnosComponent } from './abm-alumnos.component';
import {ListaAlumnosComponent} from "../lista-alumnos/lista-alumnos.component";

describe('AbmAlumnosComponent', () => {
  let component: AbmAlumnosComponent;
  let fixture: ComponentFixture<AbmAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmAlumnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AbmAlumnosComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AbmAlumnosComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-unit-test!');
  });
});
