import { Component, OnInit } from '@angular/core';
import { Alumno } from "../../../shared/models/alumno";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { AbmAlumnosComponent } from "../abm-alumnos/abm-alumnos.component";
import { AlumnoService } from 'src/app/services/alumnos.service.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { CursoState } from "../../cursos/state/curso-state.reducer";
import {
  agregarAlumnoState,
  cargarAlumnoState,
  editarAlumnoState,
  eliminarAlumnoState
} from "../state/alumno-state.actions";
import { selectAlumnosCargados, selectCargandoAlumnos } from "../state/alumno-state.selectors";

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit{
  alumnos: Alumno[] = [];
  dataSource: MatTableDataSource<Alumno> = new MatTableDataSource<Alumno>([]);
  columnas: string[] = ['nombre', 'sexo', 'perfil', 'acciones'];
  userLoggued?: User;
  cargando$!: Observable<Boolean>;

  constructor(
    private dialog: MatDialog, private alumnoService: AlumnoService, private authService: AuthService,
    private snackBar: MatSnackBar, private store: Store<CursoState>
  ) {
    this.store.dispatch(cargarAlumnoState());
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()){
      this.userLoggued = JSON.parse((JSON.parse(JSON.stringify(localStorage.getItem('ACCESS_TOKEN')))));
    }
    this.cargando$ = this.store.select(selectCargandoAlumnos);
    this.store.select(selectAlumnosCargados).subscribe(data=> {
      this.alumnos = data;
      this.dataSource = new MatTableDataSource<Alumno>(data);
    });
  }

  editarAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(AbmAlumnosComponent, {
      data: {'title': 'Editar', 'alumno': alumno}
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result && result.event !== 'close')
        this.guardarAlumno(result.data);
    });
  }

  agregarAlumno() {
    let dialogRef = this.dialog.open(AbmAlumnosComponent, {
      data: {'title': 'Nuevo', 'alumno': {id: null, nombre: '', apellido: '', sexo: '', perfil: ''}}
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result && result.event !== 'close')
        this.guardarAlumno(result.data);
    });

  }

  guardarAlumno(alumno: Alumno){
    if(alumno.id){
      this.store.dispatch(editarAlumnoState({alumno: alumno}));
    }else{
      this.store.dispatch(agregarAlumnoState({alumno: alumno}));
    }
  }

  eliminarAlumno(alumno: Alumno){
    this.store.dispatch(eliminarAlumnoState({alumno: alumno}));
    this.snackBar.open(`El alumno ha sido eliminado`, `Aceptar`, {
      duration: 4000, verticalPosition: 'top'
    });
  }

  verDeatalleAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(AbmAlumnosComponent, {
      data: {title: 'Detalle Alumno', 'alumno': alumno, isDetail: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.alumnoService.obtenerAlumnos().subscribe(data=> {
        this.alumnos = data;
        this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
      });
    });
  }
}
