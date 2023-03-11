import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
    private userService: AuthService,
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
    console.log("kkk");
    this.isSubmitted = true;
    if (this.authForm.invalid){
      alert("Ingrese un usuario y conttraseña");
      return;
    }

    if(true){
      this.authService.signIn(this.authForm.value);
      this.router.navigateByUrl('/alumnos/list');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

}
