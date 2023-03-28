import { Component, Inject } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Alumno} from "../../../shared/models/alumno";
import {Inscripcion} from "../../../shared/models/inscripcion";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CursoService} from "../../../services/cursos.service.service";
import {MatTableDataSource} from "@angular/material/table";
import {Curso} from "../../../shared/models/curso";
import {InscripcionesService} from "../../../services/inscripciones.service";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {AlumnoService} from "../../../services/alumnos.service.service";

@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.css']
})
export class AbmAlumnosComponent {
  formHerrera: FormGroup;
  hasError: boolean = false;
  formValid: boolean = false;
  action: string = 'Nuevo';
  alumno!: Alumno;
  isDetail: Boolean = false;
  cursos: Curso[] = [];
  inscripcion!: Inscripcion;

  elementoInscripcion: any = {
    curso: new FormControl('', [Validators.required]),
    fechaFin: new FormControl(new Date(), [Validators.required]),
  }

  formInscripcion = new FormGroup(this.elementoInscripcion);
  fechaFin: Date = new Date();
  curso!: Curso;
  constructor(
    private dialogRef: MatDialogRef<AbmAlumnosComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cursoService: CursoService,
    private inscripcionService: InscripcionesService,
    private alumnoService: AlumnoService,
  ) {
    this.obtenerCursos();
    this.action = data['title'];
    this.isDetail = data['isDetail'];
    let inscripciones = [];
    if(data.alumno.inscripciones && data.alumno.inscripciones.length >0){
      inscripciones = JSON.parse(JSON.stringify(data.alumno.inscripciones));
    }
    this.alumno = {
      id: data.alumno.id,
      nombre: data.alumno.nombre,
      apellido: data.alumno.apellido,
      edad: data.alumno.edad,
      correo:data.alumno.correo,
      estaMatriculado: data.alumno.estaMatriculado,
      inscripciones: inscripciones
    };
    const formato = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let elementos: any = {
      nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      edad: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.pattern(formato)]),
      estaMatriculado: new FormControl()
    }

    this.formHerrera = new FormGroup(elementos);
  }

  closeModal(){
    this.dialogRef.close({event:'close'});
  }

  guardar(){
    if (!this.formHerrera.valid){
      this.snackBar.open(`Debe completar los campos requeridos`, `Aceptar`, {
        duration: 4000, verticalPosition: 'top'
      });
      return;
    }
    this.dialogRef.close({event: 'add', data: this.alumno});
  }

  inactivar(){
    const activos = this.alumno.inscripciones?.filter(ele => ele.isActive);

    this.dialogRef.close({event: 'inactive', data: {id: this.alumno.id, activos: activos}});
  }

  obtenerCursos(){
    this.cursoService.obtenerCursos().subscribe(data=> {
      console.log(data)
      this.cursos = data;
    });
  }

  inscribir(){
    if(!this.formInscripcion.valid){
      this.snackBar.open(`Por favor llene los campos obligatorios`, `Aceptar`, {
        duration: 4000, verticalPosition: 'top'
      });
      return;
    }
    const inscripcion: Inscripcion = {fecha: this.fechaFin, curso: this.curso, isActive: true, alumno: this.alumno}
    this.inscripcionService.agregarInscripcion(inscripcion).subscribe(result => {
      this.alumno.inscripciones?.push(result);
      this.alumnoService.editarAlumno(this.alumno).subscribe(data=> {
        this.snackBar.open(`Se agrego la inscripcion`, `Aceptar`, {
          duration: 4000, verticalPosition: 'top'
        });
      });
    });

  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.fechaFin = event.value;
    }
  }

  quitarIncripcion(inscripcion: Inscripcion) {
    const findInscripcion = this.alumno.inscripciones?.findIndex(element => element.id === inscripcion.id);
    console.log(findInscripcion)
    // @ts-ignore
    this.alumno.inscripciones?.splice(findInscripcion, 1);
    this.inscripcionService.eliminarInscripcion(inscripcion).subscribe(result => {
      this.alumnoService.editarAlumno(this.alumno).subscribe(data=> {
        this.snackBar.open(`Se elimino la inscripcion`, `Aceptar`, {
          duration: 4000, verticalPosition: 'top'
        });
      });
    });
  }
}
