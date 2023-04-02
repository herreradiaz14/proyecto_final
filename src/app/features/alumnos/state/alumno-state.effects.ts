import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, concatMap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  agregarAlumnoState,
  alumnosCargados,
  cargarAlumnoState,
  editarAlumnoState,
  eliminarAlumnoState
} from "./alumno-state.actions";
import { AlumnoService } from "../../../services/alumnos.service.service";
import { Alumno } from "../../../shared/models/alumno";


@Injectable()
export class AlumnoStateEffects {

  cargarAlumnos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cargarAlumnoState),
      concatMap(() => {
        return this.alumnos.obtenerAlumnos().pipe(
          map((c: Alumno[]) => alumnosCargados({alumnos: c}))
        )
      })
    )
  });

  agregarAlumno$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(agregarAlumnoState),
      concatMap(({ alumno }) => {
        return this.alumnos.agregarAlumno(alumno).pipe(
          map((alumno: Alumno) => {
            this.snackBar.open(`Alumno creado correctamente`, `Aceptar`, {
              duration: 4000, verticalPosition: 'top'
            });
            return cargarAlumnoState();
          })
        )
      })
    );
  });

  editarAlumno$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editarAlumnoState),
      concatMap(({ alumno }) => {
        return this.alumnos.editarAlumno(alumno).pipe(
          map((alumno: Alumno) => {
            this.snackBar.open(`Alumno modificado correctamente`, `Aceptar`, {
              duration: 4000, verticalPosition: 'top'
            });
            return cargarAlumnoState();
          })
        )
      })
    );
  });

  elimninarAlumno$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(eliminarAlumnoState),
      concatMap(({ alumno }) => {
        return this.alumnos.eliminarAlumno(alumno).pipe(
          map((alumno: Alumno) => {
            return cargarAlumnoState();
          })
        )
      })
    )
  });

  constructor(
    private alumnos: AlumnoService,
    private actions$: Actions,
    private router: Router,
    private snackBar: MatSnackBar
  ){}
}
