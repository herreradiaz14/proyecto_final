import * as fromAlumnoState from './alumno-state.reducer';
import { selectAlumnoStateState } from './alumno-state.selectors';

describe('AlumnoState Selectors', () => {
  it('should select the feature state', () => {
    const result = selectAlumnoStateState({
      [fromAlumnoState.alumnoStateFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
