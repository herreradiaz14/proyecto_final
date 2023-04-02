import * as fromUsuarioState from './usuario-state.reducer';
import { selectUsuarioStateState } from './usuario-state.selectors';

describe('UsuarioState Selectors', () => {
  it('should select the feature state', () => {
    const result = selectUsuarioStateState({
      [fromUsuarioState.usuarioStateFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
