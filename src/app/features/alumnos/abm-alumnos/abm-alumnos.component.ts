import { Component, Inject } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Alumno} from "../../../shared/models/alumno";
import {Inscripcion} from "../../../shared/models/inscripcion";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  constructor(
    private dialogRef: MatDialogRef<AbmAlumnosComponent>, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
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
}
