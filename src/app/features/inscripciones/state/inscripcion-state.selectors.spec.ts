import * as fromInscripcionState from './inscripcion-state.reducer';
import { selectInscripcionStateState } from './inscripcion-state.selectors';

describe('InscripcionState Selectors', () => {
  it('should select the feature state', () => {
    const result = selectInscripcionStateState({
      [fromInscripcionState.inscripcionStateFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
