import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UsuarioStateEffects } from './usuario-state.effects';

describe('UsuarioStateEffects', () => {
  let actions$: Observable<any>;
  let effects: UsuarioStateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsuarioStateEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(UsuarioStateEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
