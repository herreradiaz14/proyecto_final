import { Component, OnInit } from '@angular/core';
import { Curso } from "../../../shared/models/curso";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { AbmCursosComponent } from "../abm-cursos/abm-cursos.component";
import { CursoService } from 'src/app/services/cursos.service.service';
import { User } from "../../../components/auth/models/user";
import { AuthService } from "../../../services/auth.service";
@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css']
})
export class ListaCursosComponent implements OnInit{
  cursos: Curso[] = [];
  dataSource: MatTableDataSource<Curso> = new MatTableDataSource<Curso>([]);
  columnas: string[] = ['nombre', 'profesor', 'duracionHoras', 'fechaInicio', 'acciones'];
  userLoggued?: User;

  constructor(private dialog: MatDialog, private cursoService: CursoService, private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()){
      this.userLoggued = JSON.parse((JSON.parse(JSON.stringify(localStorage.getItem('ACCESS_TOKEN')))));
      console.log(this.userLoggued);
    }

    //this.cursos = this.listData();
    this.cursoService.obtenerCursos().subscribe(data=> {
      this.cursos = data;
      this.dataSource = new MatTableDataSource<Curso>(this.cursos);
    });
  }

  listData(): Curso[] {
    return [
       {id: 1, nombre: 'Angular', profesor: 'Lisseth Cun', duracionHoras: 50, fechaInicio: new Date(), alumnos:[
          {id: 1, nombre: 'Carlos', apellido: 'Herrera', edad: 29,
            correo: 'herreradiaz14@gmail.com', estaMatriculado: true, isActive: true },
           {id: 2, nombre: 'Jennifer', apellido: 'Honores', edad: 30, correo: 'jennifer.honores@gmail.com', estaMatriculado: false, isActive: true}]
      },
        {id: 2, nombre: 'Odoo', profesor: 'Jose Chamba', duracionHoras: 80, fechaInicio: new Date(), alumnos:[
            {id: 1, nombre: 'Carlos', apellido: 'Herrera', edad: 29,
              correo: 'herreradiaz14@gmail.com', estaMatriculado: true, isActive: true }]
        },
       {id: 3, nombre: 'Angular', profesor: 'Lisseth Cun', duracionHoras: 50, fechaInicio: new Date()}
    ];
  }

  editarCurso(curso: Curso) {
    const dialogRef = this.dialog.open(AbmCursosComponent, {
      data: {'title': 'Editar', 'curso': curso}
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result.event !== 'close')
        this.guardarCurso(result.data);
    });
  }

  agregarCurso() {
    let dialogRef = this.dialog.open(AbmCursosComponent, {
      data: {'title': 'Nuevo', 'curso': {id: null, nombre: '', profesor: '', duracionHoras: 0, fechaInicio: ''}}
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result.event !== 'close')
        this.guardarCurso(result.data);
    });

  }

  guardarCurso(curso: Curso){
    if(curso.id){
      const findCurso = this.cursos.find(element=>element.id===curso.id)
      if(findCurso){
        this.cursoService.editarCurso(curso).subscribe(data=> {
          findCurso.nombre = curso.nombre;
          findCurso.profesor = curso.profesor;
          findCurso.duracionHoras = curso.duracionHoras;
          findCurso.fechaInicio = curso.fechaInicio;
          this.dataSource = new MatTableDataSource<Curso>(this.cursos);
        });
      }
    }else{
      this.cursoService.agregarCurso(curso).subscribe(data=> {
        this.cursos.push(data);
        this.dataSource = new MatTableDataSource<Curso>(this.cursos);
      });
    }
  }

  eliminarCurso(curso: Curso){
    this.cursoService.eliminarCurso(curso).subscribe(data=> {
      const findCurso = this.cursos.findIndex(element=>element.id===curso.id)
      this.cursos.splice(findCurso, 1);
      this.dataSource = new MatTableDataSource<Curso>(this.cursos);
      alert("El curso ha sido eliminado");
    });
  }


  verDeatalleCurso(curso: Curso) {
    const dialogRef = this.dialog.open(AbmCursosComponent, {
      data: {title: 'Detalle Curso', 'curso': curso, isDetail: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result.event !== 'close')
        this.quitarIncripcion(result.data);
    });
  }

  quitarIncripcion(curso: any){
    const findCurso = this.cursos.find(element=>element.id===curso.id);
    if(findCurso){
      findCurso.alumnos = curso.activos;
      this.dataSource = new MatTableDataSource<Curso>(this.cursos);
      alert("Se actualizaron los alumnos");
    }

  }
}
