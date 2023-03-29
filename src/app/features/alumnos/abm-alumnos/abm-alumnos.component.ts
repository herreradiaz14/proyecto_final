import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from "../../../shared/models/alumno";
import { Inscripcion } from "../../../shared/models/inscripcion";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CursoService } from "../../../services/cursos.service.service";
import { Curso } from "../../../shared/models/curso";
import { InscripcionesService } from "../../../services/inscripciones.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { AlumnoService } from "../../../services/alumnos.service.service";
import { User } from "../../../shared/models/user";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.css']
})
export class AbmAlumnosComponent implements OnInit{
  formHerrera: FormGroup;
  hasError: boolean = false;
  formValid: boolean = false;
  action: string = 'Nuevo';
  alumno!: Alumno;
  usuarioLogueado!: User;
  isDetail: Boolean = false;
  cursos: Curso[] = [];
  inscripcion!: Inscripcion;
  listaSexo: any[] = [{'id': 'masculino', 'label': 'Masculino'}, {'id': 'femenino', 'label': 'Femenino'}];
  listaPerfil: any[] = [
    {'id': 'desarrollador', 'label': 'Desarrollador'}, {'id': 'it', 'label': 'IT'}, {'id': 'usuarioFinal', 'label': 'Usuario final'}
  ];

  elementoInscripcion: any = {
    curso: new FormControl('', [Validators.required]),
    fechaFin: new FormControl(new Date(), [Validators.required]),
  }

  formInscripcion = new FormGroup(this.elementoInscripcion);
  fechaFin: Date = new Date();
  curso: any = null;
  constructor(
    private dialogRef: MatDialogRef<AbmAlumnosComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cursoService: CursoService,
    private inscripcionService: InscripcionesService,
    private alumnoService: AlumnoService,
    private authService: AuthService
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
      sexo: data.alumno.sexo,
      perfil:data.alumno.perfil,
      inscripciones: inscripciones
    };
    let elementos: any = {
      nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      sexo: new FormControl('', [Validators.required]),
      perfil: new FormControl('', [Validators.required])
    }

    this.formHerrera = new FormGroup(elementos);
  }

  ngOnInit(): void{
    if (this.authService.isLoggedIn()){
      this.usuarioLogueado = JSON.parse((JSON.parse(JSON.stringify(localStorage.getItem('ACCESS_TOKEN')))));
      console.log("---");
      console.log(this.usuarioLogueado);
    }
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
    const inscripcion: Inscripcion = {
      fecha: this.fechaFin, curso: this.curso, isActive: true,
      alumno: this.alumno, usuarioInscribio: this.usuarioLogueado
    }
    this.inscripcionService.agregarInscripcion(inscripcion).subscribe(result => {
      this.alumno.inscripciones?.push(result);
      this.alumnoService.editarAlumno(this.alumno).subscribe(data=> {
        this.snackBar.open(`Se agregó la inscripción`, `Aceptar`, {
          duration: 4000, verticalPosition: 'top'
        });
        this.curso = null;
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
    // @ts-ignore
    this.alumno.inscripciones?.splice(findInscripcion, 1);
    this.inscripcionService.eliminarInscripcion(inscripcion).subscribe(result => {
      this.alumnoService.editarAlumno(this.alumno).subscribe(data=> {
        this.snackBar.open(`Se eliminó la inscripción`, `Aceptar`, {
          duration: 4000, verticalPosition: 'top'
        });
      });
    });
  }
}
