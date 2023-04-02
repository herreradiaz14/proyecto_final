import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CursoStateEffects } from './curso-state.effects';

describe('CursoStateEffects', () => {
  let actions$: Observable<any>;
  let effects: CursoStateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CursoStateEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CursoStateEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
