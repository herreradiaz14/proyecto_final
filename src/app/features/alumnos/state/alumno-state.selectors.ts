import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAlumnoState from './alumno-state.reducer';

export const selectAlumnoStateState = createFeatureSelector<fromAlumnoState.AlumnoState>(
  fromAlumnoState.alumnoStateFeatureKey
);

export const selectCargandoAlumnos = createSelector(
  selectAlumnoStateState,
  (state: fromAlumnoState.AlumnoState) => state.cargando
);

export const selectAlumnosCargados = createSelector(
  selectAlumnoStateState,
  (state: fromAlumnoState.AlumnoState) => state.alumnos
);
