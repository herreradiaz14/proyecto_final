import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { InscripcionStateEffects } from './inscripcion-state.effects';

describe('InscripcionStateEffects', () => {
  let actions$: Observable<any>;
  let effects: InscripcionStateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InscripcionStateEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(InscripcionStateEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
