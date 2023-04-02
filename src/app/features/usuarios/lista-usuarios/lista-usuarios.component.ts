import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { User } from "../../../shared/models/user";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "../../../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "../../../services/user.service";
import { AbmUsuariosComponent } from "../abm-usuarios/abm-usuarios.component";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { UsuarioState } from "../state/usuario-state.reducer";
import {
  cargarUsuarioState, agregarUsuarioState, editarUsuarioState, eliminarUsuarioState
} from "../state/usuario-state.actions";
import {
  selectCargandoUsuarios, selectUsuariosCargados
} from "../state/usuario-state.selectors";

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
  cargando$!: Observable<Boolean>;

  constructor(
    private dialog: MatDialog, private userService: UserService,
    private authService: AuthService, private snackBar: MatSnackBar, private store: Store<UsuarioState>
  ) {
    this.store.dispatch(cargarUsuarioState());
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()){
      this.userLoggued = JSON.parse((JSON.parse(JSON.stringify(localStorage.getItem('ACCESS_TOKEN')))));
    }

    this.cargando$ = this.store.select(selectCargandoUsuarios);
    this.store.select(selectUsuariosCargados).subscribe(data=> {
      this.usuarios = data;
      this.dataSource = new MatTableDataSource<User>(data);
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
    if(usuario.id){
      this.store.dispatch(editarUsuarioState({usuario: usuario}));
    }else{
      this.store.dispatch(agregarUsuarioState({usuario: usuario}));
    }
  }

  eliminarUsuario(usuario: User){
    this.store.dispatch(eliminarUsuarioState({usuario: usuario}));
    this.snackBar.open(`El usuario ha sido eliminado`, `Aceptar`, {
      duration: 4000, verticalPosition: 'top'
    });
  }
}
