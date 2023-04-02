import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscripcionState from './inscripcion-state.reducer';

export const selectInscripcionStateState = createFeatureSelector<fromInscripcionState.InscripcionState>(
  fromInscripcionState.inscripcionStateFeatureKey
);

export const selectCargandoInscripciones = createSelector(
  selectInscripcionStateState,
  (state: fromInscripcionState.InscripcionState) => state.cargando
);

export const selectInscripcionesCargadas = createSelector(
  selectInscripcionStateState,
  (state: fromInscripcionState.InscripcionState) => state.inscripciones
);
