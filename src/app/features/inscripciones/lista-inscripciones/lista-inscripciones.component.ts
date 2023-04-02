import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { InscripcionesService } from "../../../services/inscripciones.service";
import { Inscripcion } from "../../../shared/models/inscripcion";
import { AbmInscripcionesComponent } from "../abm-inscripciones/abm-inscripciones.component";
import { User } from "../../../shared/models/user";
import { AuthService } from "../../../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { InscripcionState } from "../state/inscripcion-state.reducer";
import {
  agregarInscripcionState,
  cargarInscripcionState,
  editarInscripcionState, eliminarInscripcionState
} from "../state/inscripcion-state.actions";
import {
  selectCargandoInscripciones,
  selectInscripcionesCargadas,
} from "../state/inscripcion-state.selectors";

@Component({
  selector: 'app-lista-inscripciones',
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.css']
})
export class ListaInscripcionesComponent implements OnInit{
  inscripciones: Inscripcion[] = [];
  dataSource: MatTableDataSource<Inscripcion> = new MatTableDataSource<Inscripcion>([]);
  columnas: string[] = ['fecha', 'usuarioInscribio', 'curso', 'alumno', 'isActive', 'acciones'];
  userLoggued?: User;
  cargando$!: Observable<Boolean>;

  constructor(
    private dialog: MatDialog, private inscripcionService: InscripcionesService,
    private authService: AuthService, private snackBar: MatSnackBar, private router: Router,
    private store: Store<InscripcionState>
  ) {
    this.store.dispatch(cargarInscripcionState());
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()){
      this.userLoggued = JSON.parse((JSON.parse(JSON.stringify(localStorage.getItem('ACCESS_TOKEN')))));
    }

    this.cargando$ = this.store.select(selectCargandoInscripciones);
    this.store.select(selectInscripcionesCargadas).subscribe(data=> {
      this.inscripciones = data;
      this.dataSource = new MatTableDataSource<Inscripcion>(data);
    });
  }

  editarInscripcion(inscripcion: Inscripcion) {
    const dialogRef = this.dialog.open(AbmInscripcionesComponent, {
      data: {'title': 'Editar', 'inscripcion': inscripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result && result.event !== 'close')
        this.guardarInscripcion(result.data);
    });
  }

  agregarInscripcion() {
    this.router.navigateByUrl('/alumnos/list');
    this.snackBar.open(`Puede realizar las inscripciones desde esta vista, para ello debe dar clic en Ver Detalles`, `Aceptar`, {
      duration: 25000, verticalPosition: 'top'
    });
  }

  guardarInscripcion(inscripcion: Inscripcion){
    if (inscripcion.id){
      this.store.dispatch(editarInscripcionState({inscripcion: inscripcion}));
    }else{
      this.store.dispatch(agregarInscripcionState({inscripcion: inscripcion}));
    }
  }

  eliminarInscripcion(inscripcion: Inscripcion){
    this.store.dispatch(eliminarInscripcionState({inscripcion: inscripcion}));
    this.snackBar.open(`La inscripción ha sido eliminada`, `Aceptar`, {
      duration: 4000, verticalPosition: 'top'
    });
  }
}


