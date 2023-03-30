import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "../../../shared/models/user";

@Component({
  selector: 'app-abm-usuarios',
  templateUrl: './abm-usuarios.component.html',
  styleUrls: ['./abm-usuarios.component.css']
})
export class AbmUsuariosComponent {
  formHerrera: FormGroup;
  hasError: boolean = false;
  formValid: boolean = false;
  action: string = 'Nuevo';
  usuario!: User;

  constructor(
    private dialogRef: MatDialogRef<AbmUsuariosComponent>, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.action = data['title'];
    this.usuario = {
      id: data.usuario.id,
      username: data.usuario.username,
      password: data.usuario.password,
      email: data.usuario.email,
      direccion: data.usuario.direccion,
      telefono: data.usuario.telefono,
      isAdmin: data.usuario.isAdmin
    };
    const formato = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let elementos: any = {
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
      email: new FormControl('', [Validators.required, Validators.pattern(formato)]),
      telefono: new FormControl('', [Validators.required]),
      direccion: new FormControl('', []),
      isAdmin: new FormControl('', []),
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
    this.dialogRef.close({event: 'add', data: this.usuario});
  }
}
