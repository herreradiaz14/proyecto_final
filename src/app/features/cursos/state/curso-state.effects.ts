import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, concatMap } from 'rxjs/operators';
import { CursoService } from "../../../services/cursos.service.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  agregarCursoState,
  cargarCursoState,
  cursosCargados,
  editarCursoState,
  eliminarCursoState
} from "./curso-state.actions";
import { Curso } from "../../../shared/models/curso";


@Injectable()
export class CursoStateEffects {

  cargarCursos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cargarCursoState),
      concatMap(() => {
        return this.cursos.obtenerCursos().pipe(
          map((c: Curso[]) => cursosCargados({cursos: c}))
        )
      })
    )
  });

  agregarCurso$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(agregarCursoState),
      concatMap(({ curso }) => {
        return this.cursos.agregarCurso(curso).pipe(
          map((curso: Curso) => {
            this.snackBar.open(`${curso.nombre} creado correctamente`, `Aceptar`, {
              duration: 4000, verticalPosition: 'top'
            });
            return cargarCursoState();
          })
        )
      })
    );
  });

  editarCurso$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editarCursoState),
      concatMap(({ curso }) => {
        return this.cursos.editarCurso(curso).pipe(
          map((curso: Curso) => {
            this.snackBar.open(`Curso modificado correctamente`, `Aceptar`, {
              duration: 4000, verticalPosition: 'top'
            });
            return cargarCursoState();
          })
        )
      })
    );
  });

  elimninarCurso$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(eliminarCursoState),
      concatMap(({ curso }) => {
        return this.cursos.eliminarCurso(curso).pipe(
          map((curso: Curso) => {
            return cargarCursoState();
          })
        )
      })
    )
  });

  constructor(
    private cursos: CursoService,
    private actions$: Actions,
    private router: Router,
    private snackBar: MatSnackBar
  ){}
}
