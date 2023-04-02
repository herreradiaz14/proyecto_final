import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCursoState from './curso-state.reducer';

export const selectCursoStateState = createFeatureSelector<fromCursoState.CursoState>(
  fromCursoState.cursoStateFeatureKey
);

export const selectCargandoCursos = createSelector(
  selectCursoStateState,
  (state: fromCursoState.CursoState) => state.cargando
);

export const selectCursosCargados = createSelector(
  selectCursoStateState,
  (state: fromCursoState.CursoState) => state.cursos
);
