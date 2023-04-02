import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { User } from "../../../shared/models/user";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "../../../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "../../../services/user.service";
import {AbmUsuariosComponent} from "../abm-usuarios/abm-usuarios.component";

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: User[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  columnas: string[] = ['username', 'password', 'email', 'direccion', 'telefono', 'isAdmin', 'acciones'];
  userLoggued?: User;

  constructor(
    private dialog: MatDialog, private userService: UserService,
    private authService: AuthService, private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()){
      this.userLoggued = JSON.parse((JSON.parse(JSON.stringify(localStorage.getItem('ACCESS_TOKEN')))));
    }

    this.userService.obtenerUsuario().subscribe(data=> {
      this.usuarios = data;
      this.dataSource = new MatTableDataSource<User>(this.usuarios);
    });
  }

  editarUsuario(usuario: User) {
    const dialogRef = this.dialog.open(AbmUsuariosComponent, {
      data: {'title': 'Editar', 'usuario': usuario}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.event !== 'close')
        this.guardarUsuario(result.data);
    });
  }

  agregarUsuario() {
    let dialogRef = this.dialog.open(AbmUsuariosComponent, {
      data: {'title': 'Nuevo', 'usuario': { id: null, username: '', password: '', email: '', direccion: '', telefono: '', isAdmin: false}}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.event !== 'close')
        this.guardarUsuario(result.data);
    });
  }

  guardarUsuario(usuario: User){
    let component_message = `El usuario ha sido creado correctamente`;
    if(usuario.id){
      const findUser = this.usuarios.find(element=>element.id===usuario.id)
      if(findUser){
        this.userService.editarUsuario(usuario).subscribe(data=> {
          findUser.username = usuario.username;
          findUser.password = usuario.password;
          findUser.email = usuario.email;
          findUser.direccion = usuario.direccion;
          findUser.telefono = usuario.telefono;
          findUser.isAdmin = usuario.isAdmin;
          this.dataSource = new MatTableDataSource<User>(this.usuarios);
        });
        component_message = `El usuario ha sido modificado correctamente`;
      }
    }else{
      this.userService.agregarUsuario(usuario).subscribe(data=> {
        this.usuarios.push(data);
        this.dataSource = new MatTableDataSource<User>(this.usuarios);
      });
    }

    this.snackBar.open(component_message, `Aceptar`, {
      duration: 4000, verticalPosition: 'top'
    });
  }

  eliminarUsuario(usuario: User){
    this.userService.eliminarUsuario(usuario).subscribe(data=> {
      const findUsuario = this.usuarios.findIndex(element=>element.id===usuario.id)
      this.usuarios.splice(findUsuario, 1);
      this.dataSource = new MatTableDataSource<User>(this.usuarios);
      this.snackBar.open(`El usuario ha sido eliminado`, `Aceptar`, {
        duration: 4000, verticalPosition: 'top'
      });
    });
  }
}
