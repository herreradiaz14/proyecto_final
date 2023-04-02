import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsuarioState from './usuario-state.reducer';

export const selectUsuarioStateState = createFeatureSelector<fromUsuarioState.UsuarioState>(
  fromUsuarioState.usuarioStateFeatureKey
);

export const selectCargandoUsuarios = createSelector(
  selectUsuarioStateState,
  (state: fromUsuarioState.UsuarioState) => state.cargando
);

export const selectUsuariosCargados = createSelector(
  selectUsuarioStateState,
  (state: fromUsuarioState.UsuarioState) => state.usuarios
);
