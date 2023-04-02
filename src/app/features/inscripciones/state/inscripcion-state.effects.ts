import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, concatMap } from 'rxjs/operators';
import {
  agregarInscripcionState,
  cargarInscripcionState,
  editarInscripcionState, eliminarInscripcionState,
  inscripcionesCargadas
} from "./inscripcion-state.actions";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { InscripcionesService } from "../../../services/inscripciones.service";
import { Inscripcion } from "../../../shared/models/inscripcion";


@Injectable()
export class InscripcionStateEffects {

  cargarInscripciones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cargarInscripcionState),
      concatMap(() => {
        return this.inscripciones.obtenerInscripciones().pipe(
          map((c: Inscripcion[]) => inscripcionesCargadas({inscripciones: c}))
        )
      })
    )
  });

  agregarInscripcion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(agregarInscripcionState),
      concatMap(({ inscripcion }) => {
        return this.inscripciones.agregarInscripcion(inscripcion).pipe(
          map((inscripcion: Inscripcion) => {
            this.snackBar.open(`Inscripción creada correctamente`, `Aceptar`, {
              duration: 4000, verticalPosition: 'top'
            });
            return cargarInscripcionState();
          })
        )
      })
    );
  });

  editarInscripcion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editarInscripcionState),
      concatMap(({ inscripcion }) => {
        return this.inscripciones.editarInscripcion(inscripcion).pipe(
          map((inscripcion: Inscripcion) => {
            this.snackBar.open(`Inscripción modificada correctamente`, `Aceptar`, {
              duration: 4000, verticalPosition: 'top'
            });
            return cargarInscripcionState();
          })
        )
      })
    );
  });

  elimninarInscripciono$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(eliminarInscripcionState),
      concatMap(({ inscripcion }) => {
        return this.inscripciones.eliminarInscripcion(inscripcion).pipe(
          map((inscripcion: Inscripcion) => {
            return cargarInscripcionState();
          })
        )
      })
    )
  });

  constructor(
    private inscripciones: InscripcionesService,
    private actions$: Actions,
    private router: Router,
    private snackBar: MatSnackBar
  ){}
}
