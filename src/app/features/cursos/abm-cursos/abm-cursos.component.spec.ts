import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmCursosComponent } from './abm-cursos.component';
import {ListaCursosComponent} from "../lista-cursos/lista-cursos.component";

describe('AbmCursosComponent', () => {
  let component: AbmCursosComponent;
  let fixture: ComponentFixture<AbmCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmCursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AbmCursosComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AbmCursosComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-unit-test!');
  });
});
