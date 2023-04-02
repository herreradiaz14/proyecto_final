import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, concatMap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  agregarUsuarioState,
  cargarUsuarioState,
  editarUsuarioState,
  eliminarUsuarioState,
  usuariosCargados
} from "./usuario-state.actions";
import { UserService } from "../../../services/user.service";
import { User } from "../../../shared/models/user";


@Injectable()
export class UsuarioStateEffects {

  cargarUsuarios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cargarUsuarioState),
      concatMap(() => {
        return this.usuarios.obtenerUsuario().pipe(
          map((c: User[]) => usuariosCargados({usuarios: c}))
        )
      })
    )
  });

  agregarUsuario$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(agregarUsuarioState),
      concatMap(({ usuario }) => {
        return this.usuarios.agregarUsuario(usuario).pipe(
          map((usuario: User) => {
            this.snackBar.open(`Usuario creado correctamente`, `Aceptar`, {
              duration: 4000, verticalPosition: 'top'
            });
            return cargarUsuarioState();
          })
        )
      })
    );
  });

  editarUsuario$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editarUsuarioState),
      concatMap(({ usuario }) => {
        return this.usuarios.editarUsuario(usuario).pipe(
          map((usuario: User) => {
            this.snackBar.open(`Usuario modificado correctamente`, `Aceptar`, {
              duration: 4000, verticalPosition: 'top'
            });
            return cargarUsuarioState();
          })
        )
      })
    );
  });

  elimninarUsuario$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(eliminarUsuarioState),
      concatMap(({ usuario }) => {
        return this.usuarios.eliminarUsuario(usuario).pipe(
          map((usuario: User) => {
            return cargarUsuarioState();
          })
        )
      })
    )
  });

  constructor(
    private usuarios: UserService,
    private actions$: Actions,
    private router: Router,
    private snackBar: MatSnackBar
  ){}
}
