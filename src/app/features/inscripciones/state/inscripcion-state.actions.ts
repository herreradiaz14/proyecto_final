import { createAction, props } from '@ngrx/store';
import { Inscripcion } from "../../../shared/models/inscripcion";

export const cargarInscripcionState = createAction(
  '[InscripcionState] Cargar InscripcionStates'
);

export const inscripcionesCargadas = createAction(
  '[InscripcionState] Inscripciones Cargadas',
  props<{ inscripciones: Inscripcion[] }>()
);

export const agregarInscripcionState = createAction(
  '[InscripcionState] Agregar inscripcion',
  props<{ inscripcion: Inscripcion }>()
);

export const editarInscripcionState = createAction(
  '[InscripcionState] Editar inscripcion',
  props<{ inscripcion: Inscripcion }>()
);

export const eliminarInscripcionState = createAction(
  '[InscripcionState] Eliminar inscripcion',
  props<{ inscripcion: Inscripcion }>()
);
