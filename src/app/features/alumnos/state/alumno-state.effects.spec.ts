import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AlumnoStateEffects } from './alumno-state.effects';

describe('AlumnoStateEffects', () => {
  let actions$: Observable<any>;
  let effects: AlumnoStateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlumnoStateEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(AlumnoStateEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
