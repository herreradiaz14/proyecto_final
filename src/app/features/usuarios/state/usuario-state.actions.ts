import { createAction, props } from '@ngrx/store';
import { User } from "../../../shared/models/user";

export const cargarUsuarioState = createAction(
  '[UsuarioState] Cargar UsuarioStates'
);

export const usuariosCargados = createAction(
  '[UsuarioState] Usuarios cargados',
  props<{ usuarios: User[] }>()
);

export const agregarUsuarioState = createAction(
  '[UsuarioState] Agregar usuario',
  props<{ usuario: User }>()
);

export const editarUsuarioState = createAction(
  '[UsuarioState] Editar usuario',
  props<{ usuario: User }>()
);

export const eliminarUsuarioState = createAction(
  '[UsuarioState] Eliminar usuario',
  props<{ usuario: User }>()
);
