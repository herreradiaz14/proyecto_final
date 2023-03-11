import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { env } from '../environment/environment';
import { Curso } from '../shared/models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  constructor(private http: HttpClient) { }

  private capturarError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      alert(`Hubo un error del lado del cliente: ${error.message}`);
    }else{
      alert(`Hubo un error del lado del servidor: ${error.message}`);
    }

    return throwError(() => new Error('Error en el procesamiento'));
  }

  obtenerCursos(): Observable<Curso[]>{
    return this.http.get<Curso[]>(`${env.apiURL}/cursos`, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }

  agregarCurso(curso: Curso): Observable<Curso>{
    return this.http.post<Curso>(`${env.apiURL}/cursos`, curso, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }

  editarCurso(curso: Curso): Observable<Curso>{
    return this.http.put<Curso>(`${env.apiURL}/cursos/${curso.id}`, curso, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }

  eliminarCurso(curso: Curso): Observable<Curso>{
    return this.http.delete<Curso>(`${env.apiURL}/cursos/${curso.id}`, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }
}
