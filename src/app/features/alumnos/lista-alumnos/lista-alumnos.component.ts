import { Component, OnInit } from '@angular/core';
import { Alumno } from "../../../shared/models/alumno";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { AbmAlumnosComponent } from "../abm-alumnos/abm-alumnos.component";
import {Inscripcion} from "../../../shared/models/inscripcion";

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit{
  alumnos: Alumno[] = [];
  dataSource: MatTableDataSource<Alumno> = new MatTableDataSource<Alumno>([]);
  columnas: string[] = ['nombre', 'edad', 'correo', 'estaMatriculado', 'acciones'];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.alumnos = this.listData();
    this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
  }

  listData(): Alumno[] {
    return [
      {id: 1, nombre: 'Carlos', apellido: 'Herrera', edad: 29, correo: 'herreradiaz14@gmail.com', estaMatriculado: true, inscripciones: [
          {id: 1, fecha: new Date(), curso: {id: 1, nombre: 'Angular', profesor: 'Lisseth Cun', duracionHoras: 50, fechaInicio: new Date()}, pago: 400, isActive: true},
          {id: 2, fecha: new Date(), curso: {id: 2, nombre: 'Odoo', profesor: 'Jose Chamba', duracionHoras: 80, fechaInicio: new Date()}, pago: 400, isActive: true}
        ]},
      {id: 2, nombre: 'Jennifer', apellido: 'Honores', edad: 30, correo: 'jennifer.honores@gmail.com', estaMatriculado: false, inscripciones: [
          {id: 3, fecha: new Date(), curso: {id: 3, nombre: 'Angular', profesor: 'Lisseth Cun', duracionHoras: 50, fechaInicio: new Date()}, pago: 400, isActive: true}
        ]},
      {id: 3, nombre: 'Luis', apellido: 'Jiménez', edad: 32, correo: 'luis_jimenez_1@hotmail.com', estaMatriculado: false},
      {id: 4, nombre: 'María', apellido: 'López', edad: 25, correo: 'maria_lopez_2@hotmail.com', estaMatriculado: true}
    ];
  }

  editarAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(AbmAlumnosComponent, {
      data: {'title': 'Editar', 'alumno': alumno}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if ( result.event !== 'close')
        this.guardarAlumno(result.data);
    });
  }

  agregarAlumno() {
    let dialogRef = this.dialog.open(AbmAlumnosComponent, {
      data: {'title': 'Nuevo', 'alumno': {id: null, nombre: '', apellido: '', edad: 0, correo: '', estaMatriculado: false}}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if ( result.event !== 'close')
        this.guardarAlumno(result.data);
    });

  }

  guardarAlumno(alumno: Alumno){
    if(alumno.id){
      const findAlumno = this.alumnos.find(element=>element.id===alumno.id)
      if(findAlumno){
        findAlumno.nombre = alumno.nombre;
        findAlumno.apellido = alumno.apellido;
        findAlumno.edad = alumno.edad;
        findAlumno.correo = alumno.correo;
        findAlumno.estaMatriculado = alumno.estaMatriculado;
      }
    }else{
      this.alumnos.push(alumno)
    }

    this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
  }

  eliminarAlumno(alumno: Alumno){
    const findAlumno = this.alumnos.findIndex(element=>element.id===alumno.id)
    this.alumnos.splice(findAlumno, 1);
    this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
    alert("El alumno ha sido eliminado");
  }


  verDeatalleAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(AbmAlumnosComponent, {
      data: {title: 'Detalle Alumno', 'alumno': alumno, isDetail: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if ( result.event !== 'close')
        this.quitarIncripcion(result.data);
    });
  }

  quitarIncripcion(alumno: any){
    console.log(alumno)
    console.log('remove')
    const findAlumno = this.alumnos.find(element=>element.id===alumno.id);
    if(findAlumno){
      findAlumno.inscripciones = alumno.activos;
      this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
      alert("Se actualizaron los cursos");
    }

  }
}
