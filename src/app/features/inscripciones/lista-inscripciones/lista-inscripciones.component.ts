import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { InscripcionesService } from "../../../services/inscripciones.service";
import { Inscripcion } from "../../../shared/models/inscripcion";
import { AbmInscripcionesComponent } from "../abm-inscripciones/abm-inscripciones.component";
import { User } from "../../../shared/models/user";
import { AuthService } from "../../../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: 'app-lista-inscripciones',
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.css']
})
export class ListaInscripcionesComponent implements OnInit{
  inscripciones: Inscripcion[] = [];
  dataSource: MatTableDataSource<Inscripcion> = new MatTableDataSource<Inscripcion>([]);
  columnas: string[] = ['fecha', 'usuarioInscribio', 'curso', 'isActive', 'acciones'];
  userLoggued?: User;

  constructor(
    private dialog: MatDialog, private inscripcionService: InscripcionesService,
    private authService: AuthService, private snackBar: MatSnackBar, private router: Router
  ) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()){
      this.userLoggued = JSON.parse((JSON.parse(JSON.stringify(localStorage.getItem('ACCESS_TOKEN')))));
    }

    this.inscripcionService.obtenerInscripciones().subscribe(data=> {
      this.inscripciones = data;
      this.dataSource = new MatTableDataSource<Inscripcion>(this.inscripciones);
    });
  }

  editarInscripcion(inscripcion: Inscripcion) {
    const dialogRef = this.dialog.open(AbmInscripcionesComponent, {
      data: {'title': 'Editar', 'inscripcion': inscripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result.event !== 'close')
        this.guardarInscripcion(result.data);
    });
  }

  agregarInscripcion() {
    this.router.navigateByUrl('/alumnos/list');
    this.snackBar.open(`Puede realizar las inscripciones desde esta vista, para ello debe dar clic en Ver Detalles`, `Aceptar`, {
      duration: 25000, verticalPosition: 'top'
    });
  }

  guardarInscripcion(inscripcion: Inscripcion){
    if (inscripcion.id){
      const findinscripcion = this.inscripciones.find(element=>element.id===inscripcion.id)
      if(findinscripcion){
        this.inscripcionService.editarInscripcion(inscripcion).subscribe(data=> {
          findinscripcion.fecha = inscripcion.fecha;
          findinscripcion.usuarioInscribio = inscripcion.usuarioInscribio;
          findinscripcion.curso = inscripcion.curso;
          findinscripcion.isActive = inscripcion.isActive;
          this.dataSource = new MatTableDataSource<Inscripcion>(this.inscripciones);
        });
      }
    }else{
      this.inscripcionService.agregarInscripcion(inscripcion).subscribe(data=> {
        this.inscripciones.push(data);
        this.dataSource = new MatTableDataSource<Inscripcion>(this.inscripciones);
      });
    }
  }

  eliminarInscripcion(inscripcion: Inscripcion){
    this.inscripcionService.eliminarInscripcion(inscripcion).subscribe(data=> {
      const findInscripcion = this.inscripciones.findIndex(element=>element.id===inscripcion.id)
      this.inscripciones.splice(findInscripcion, 1);
      this.dataSource = new MatTableDataSource<Inscripcion>(this.inscripciones);
      this.snackBar.open(`La inscripción ha sido eliminada`, `Aceptar`, {
        duration: 4000, verticalPosition: 'top'
      });
    });
  }
}


