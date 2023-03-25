import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  authForm!: FormGroup;
  isSubmitted  =  false;
  username = '';
  password = '';
  isAdmin = false;

  constructor(private authService: AuthService,
    private userService: UserService, private snackBar: MatSnackBar,
    private router: Router, private formBuilder: FormBuilder ) { }

  ngOnInit() {
      this.authForm  =  this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        isAdmin: [false]
      });
  }

  public get formControls() {
    return this.authForm.controls;
  }

  signIn(){
    this.isSubmitted = true;
    if (this.authForm.invalid){
      this.snackBar.open(`Ingrese un usuario y contraseña`, `Aceptar`, {
        duration: 4000, verticalPosition: 'top'
      });
      return;
    }

    this.userService.obtenerUsuario().subscribe(data => {
      const usuarioLogueado = data.find(e=>e.username==this.username && e.password == this.password)
      if(usuarioLogueado){
        this.authService.signIn(usuarioLogueado);
        this.router.navigateByUrl('/alumnos/list');
        let role = 'Usuario'
        if(usuarioLogueado.isAdmin){
          role = 'Administrador'
        }
        this.snackBar.open(`Ud ha iniciado sesión como `.concat(role), `Aceptar`, {
          duration: 10000, verticalPosition: 'top'
        });
      } else {
        this.snackBar.open(`Usuario o contraseña incorrectos`, `Aceptar`, {
          duration: 4000, verticalPosition: 'top'
        });
      }
    });
  }

}
