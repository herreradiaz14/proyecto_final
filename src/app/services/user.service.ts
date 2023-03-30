import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { env } from '../environment/environment';
import { User } from "../shared/models/user";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  private capturarError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      alert(`Hubo un error del lado del cliente: ${error.message}`);
    }else{
      alert(`Hubo un error del lado del servidor: ${error.message}`);
    }

    return throwError(() => new Error('Error en el procesamiento'));
  }

  obtenerUsuario(): Observable<User[]>{
    return this.http.get<User[]>(`${env.apiURL2}/usuarios`, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }

  agregarUsuario(usuario: User): Observable<User>{
    return this.http.post<User>(`${env.apiURL2}/usuarios`, usuario, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }

  editarUsuario(usuario: User): Observable<User>{
    return this.http.put<User>(`${env.apiURL2}/usuarios/${usuario.id}`, usuario, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }

  eliminarUsuario(usuario: User): Observable<User>{
    return this.http.delete<User>(`${env.apiURL2}/usuarios/${usuario.id}`, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }
}
