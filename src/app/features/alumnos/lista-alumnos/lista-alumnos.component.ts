import { Component, OnInit } from '@angular/core';
import { Alumno } from "../../../shared/models/alumno";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { AbmAlumnosComponent } from "../abm-alumnos/abm-alumnos.component";
import { AlumnoService } from 'src/app/services/alumnos.service.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/models/user';
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(
    private dialog: MatDialog, private alumnoService: AlumnoService, private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()){
      this.userLoggued = JSON.parse((JSON.parse(JSON.stringify(localStorage.getItem('ACCESS_TOKEN')))));
    }
    this.alumnoService.obtenerAlumnos().subscribe(data=> {
      this.alumnos = data;
      this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
    });
  }

  editarAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(AbmAlumnosComponent, {
      data: {'title': 'Editar', 'alumno': alumno}
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result.event !== 'close')
        this.guardarAlumno(result.data);
    });
  }

  agregarAlumno() {
    let dialogRef = this.dialog.open(AbmAlumnosComponent, {
      data: {'title': 'Nuevo', 'alumno': {id: null, nombre: '', apellido: '', sexo: '', perfil: ''}}
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result.event !== 'close')
        this.guardarAlumno(result.data);
    });

  }

  guardarAlumno(alumno: Alumno){
    if(alumno.id){
      const findAlumno = this.alumnos.find(element=>element.id===alumno.id)
      if(findAlumno){
        this.alumnoService.editarAlumno(alumno).subscribe(data=> {
          findAlumno.nombre = alumno.nombre;
          findAlumno.apellido = alumno.apellido;
          findAlumno.perfil = alumno.perfil;
          findAlumno.sexo = alumno.sexo;

          this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
        });
      }
    }else{
      this.alumnoService.agregarAlumno(alumno).subscribe(data=> {
        this.alumnos.push(data);
        this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
      });

    }

  }

  eliminarAlumno(alumno: Alumno){
    this.alumnoService.eliminarAlumno(alumno).subscribe(data=> {
      const findAlumno = this.alumnos.findIndex(element=>element.id===alumno.id)
      this.alumnos.splice(findAlumno, 1);
      this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
      this.snackBar.open(`El alumno ha sido eliminado`, `Aceptar`, {
        duration: 4000, verticalPosition: 'top'
      });
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
