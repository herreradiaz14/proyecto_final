import { createReducer, on } from '@ngrx/store';
import * as UsuarioStateActions from './usuario-state.actions';
import { User } from "../../../shared/models/user";

export const usuarioStateFeatureKey = 'usuarioState';

export interface UsuarioState {
  cargando: boolean;
  usuarios: User[];
}

export const initialState: UsuarioState = {
  cargando: false,
  usuarios: []
};

export const reducer = createReducer(
  initialState,
  on(UsuarioStateActions.cargarUsuarioState, (state) => {
    return {...state, cargando: true};
  }),
  on(UsuarioStateActions.usuariosCargados, (state, { usuarios }) => {
    return {...state, cargando: false, usuarios};
  }),
  on(UsuarioStateActions.agregarUsuarioState, (state, { usuario: User }) => {
    return state;
  }),
  on(UsuarioStateActions.editarUsuarioState, (state, { usuario: User }) => {
    return state;
  }),
  on(UsuarioStateActions.eliminarUsuarioState, (state, { usuario: User }) => {
    return state;
  }),
);

