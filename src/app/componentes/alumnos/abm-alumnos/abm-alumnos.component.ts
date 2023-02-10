import { Component, Inject } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Alumno} from "../../../models/alumno";

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
  constructor(private dialogRef: MatDialogRef<AbmAlumnosComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data['title'];
    this.alumno = {
      id: data.alumno.id,
      nombre: data.alumno.nombre,
      apellido: data.alumno.apellido,
      edad: data.alumno.edad,
      correo:data.alumno.correo,
      estaMatriculado: data.alumno.estaMatriculado
    };
    const formato = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let elementos: any = {
      nombre: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]),
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
      alert("Debe completar los campos requeridos");
      return;
    }
    this.dialogRef.close({event: 'add', data: this.alumno});
  }
}
