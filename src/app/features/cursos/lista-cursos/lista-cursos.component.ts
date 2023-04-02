import { Component, OnInit } from '@angular/core';
import { Curso } from "../../../shared/models/curso";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { AbmCursosComponent } from "../abm-cursos/abm-cursos.component";
import { CursoService } from 'src/app/services/cursos.service.service';
import { User } from "../../../shared/models/user";
import { AuthService } from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css']
})
export class ListaCursosComponent implements OnInit{
  cursos: Curso[] = [];
  dataSource: MatTableDataSource<Curso> = new MatTableDataSource<Curso>([]);
  columnas: string[] = ['nombre', 'profesor', 'duracionHoras', 'cantidadClases', 'acciones'];
  userLoggued?: User;

  constructor(
    private dialog: MatDialog, private cursoService: CursoService,
    private authService: AuthService, private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()){
      this.userLoggued = JSON.parse((JSON.parse(JSON.stringify(localStorage.getItem('ACCESS_TOKEN')))));
    }

    this.cursoService.obtenerCursos().subscribe(data=> {
      this.cursos = data;
      this.dataSource = new MatTableDataSource<Curso>(this.cursos);
    });
  }

  editarCurso(curso: Curso) {
    const dialogRef = this.dialog.open(AbmCursosComponent, {
      data: {'title': 'Editar', 'curso': curso},
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result && result.event !== 'close')
        this.guardarCurso(result.data);
    });
  }

  agregarCurso() {
    let dialogRef = this.dialog.open(AbmCursosComponent, {
      data: {'title': 'Nuevo', 'curso': {id: null, nombre: '', profesor: '', duracionHoras: 0, cantidadClases: 0}}
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result && result.event !== 'close')
        this.guardarCurso(result.data);
    });

  }

  guardarCurso(curso: Curso){
    let component_message = `El curso ha sido creado correctamente`;
    if(curso.id){
      const findCurso = this.cursos.find(element=>element.id===curso.id)
      if(findCurso){
        this.cursoService.editarCurso(curso).subscribe(data=> {
          findCurso.nombre = curso.nombre;
          findCurso.profesor = curso.profesor;
          findCurso.duracionHoras = curso.duracionHoras;
          findCurso.cantidadClases = curso.cantidadClases;
          this.dataSource = new MatTableDataSource<Curso>(this.cursos);
        });
        component_message = `El curso ha sido modificado correctamente`;
      }
    }else{
      this.cursoService.agregarCurso(curso).subscribe(data=> {
        this.cursos.push(data);
        this.dataSource = new MatTableDataSource<Curso>(this.cursos);
      });
    }

    this.snackBar.open(component_message, `Aceptar`, {
      duration: 4000, verticalPosition: 'top'
    });
  }

  eliminarCurso(curso: Curso){
    this.cursoService.eliminarCurso(curso).subscribe(data=> {
      const findCurso = this.cursos.findIndex(element=>element.id===curso.id)
      this.cursos.splice(findCurso, 1);
      this.dataSource = new MatTableDataSource<Curso>(this.cursos);
      this.snackBar.open(`El curso ha sido eliminado`, `Aceptar`, {
        duration: 4000, verticalPosition: 'top'
      });
    });
  }


  verDeatalleCurso(curso: Curso) {
    const dialogRef = this.dialog.open(AbmCursosComponent, {
      data: {title: 'Detalle Curso', 'curso': curso, isDetail: true},
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result && result.event !== 'close')
        this.quitarIncripcion(result.data);
    });
  }

  quitarIncripcion(curso: any){
    const findCurso = this.cursos.find(element=>element.id===curso.id);
    if(findCurso){
      findCurso.alumnos = curso.activos;
      this.dataSource = new MatTableDataSource<Curso>(this.cursos);
      this.snackBar.open(`Se actualizaron los alumnos`, `Aceptar`, {
        duration: 4000, verticalPosition: 'top'
      });
    }

  }
}
