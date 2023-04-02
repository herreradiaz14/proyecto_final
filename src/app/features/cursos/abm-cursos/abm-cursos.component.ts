import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Curso} from "../../../shared/models/curso";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InscripcionesService} from "../../../services/inscripciones.service";
import {Alumno} from "../../../shared/models/alumno";

@Component({
  selector: 'app-abm-cursos',
  templateUrl: './abm-cursos.component.html',
  styleUrls: ['./abm-cursos.component.css']
})
export class AbmCursosComponent {
  formHerrera: FormGroup;
  hasError: boolean = false;
  formValid: boolean = false;
  action: string = 'Nuevo';
  curso!: Curso;
  isDetail: Boolean = false;
  constructor(
    private dialogRef: MatDialogRef<AbmCursosComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private inscripcionService: InscripcionesService,
  ) {
    this.action = data['title'];
    this.isDetail = data['isDetail'];
    this.curso = {
      id: data.curso.id,
      nombre: data.curso.nombre,
      profesor: data.curso.profesor,
      duracionHoras: data.curso.duracionHoras,
      cantidadClases:data.curso.cantidadClases,
      alumnos: []
    };
    let elementos: any = {
      nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      profesor: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      duracionHoras: new FormControl('', [Validators.required]),
      cantidadClases: new FormControl('', [Validators.required])
    }

    if(this.isDetail){
      this.listarInscripciones();
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
    this.dialogRef.close({event: 'add', data: this.curso});
  }

  inactivar(){
    const activos = this.curso.alumnos?.filter(ele => ele.isActive);

    this.dialogRef.close({event: 'inactive', data: {id: this.curso.id, activos: activos}});
  }

  listarInscripciones(){
    this.inscripcionService.obtenerInscripciones().subscribe(data=> {
      if (data && data.length > 0) {
        const filtroAlumnos = data.filter(inscripcion => inscripcion.curso && inscripcion.curso.id === this.curso.id);
        console.log(filtroAlumnos)
        if (filtroAlumnos && filtroAlumnos.length > 0) {
            for (const inscripcion of filtroAlumnos){
              if (inscripcion.alumno) {
                this.curso.alumnos?.push(inscripcion.alumno);
              }
            }
          }
        }
    });
  }
}
