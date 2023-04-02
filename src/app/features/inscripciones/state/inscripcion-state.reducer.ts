import { createReducer, on } from '@ngrx/store';
import * as InscripcionStateActions from './inscripcion-state.actions';
import { Inscripcion } from "../../../shared/models/inscripcion";

export const inscripcionStateFeatureKey = 'inscripcionState';

export interface InscripcionState {
  cargando: boolean;
  inscripciones: Inscripcion[];
}

export const initialState: InscripcionState = {
  cargando: false,
  inscripciones: []
};

export const reducer = createReducer(
  initialState,
  on(InscripcionStateActions.cargarInscripcionState, (state) => {
    return {...state, cargando: true};
  }),
  on(InscripcionStateActions.inscripcionesCargadas, (state, { inscripciones }) => {
    return {...state, cargando: false, inscripciones};
  }),
  on(InscripcionStateActions.agregarInscripcionState, (state, { inscripcion: Inscripcion }) => {
    return state;
  }),
  on(InscripcionStateActions.editarInscripcionState, (state, { inscripcion: Inscripcion }) => {
    return state;
  }),
  on(InscripcionStateActions.eliminarInscripcionState, (state, { inscripcion: Inscripcion }) => {
    return state;
  }),
);

