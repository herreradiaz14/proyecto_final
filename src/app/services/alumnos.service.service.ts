import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { env } from '../environment/environment';
import { Alumno } from '../shared/models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  constructor(private http: HttpClient) { }

  private capturarError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      alert(`Hubo un error del lado del cliente: ${error.message}`);
    }else{
      alert(`Hubo un error del lado del servidor: ${error.message}`);
    }

    return throwError(() => new Error('Error en el procesamiento'));
  }

  obtenerAlumnos(): Observable<Alumno[]>{
    return this.http.get<Alumno[]>(`${env.apiURL}/alumno`, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }

  agregarAlumno(alumno: Alumno): Observable<Alumno>{
    return this.http.post<Alumno>(`${env.apiURL}/alumno`, alumno, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }

  editarAlumno(alumno: Alumno): Observable<Alumno>{
    return this.http.put<Alumno>(`${env.apiURL}/alumno/${alumno.id}`, alumno, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }

  eliminarAlumno(alumno: Alumno): Observable<Alumno>{
    return this.http.delete<Alumno>(`${env.apiURL}/alumno/${alumno.id}`, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }
}
