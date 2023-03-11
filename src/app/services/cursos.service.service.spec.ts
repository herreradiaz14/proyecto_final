import { TestBed } from '@angular/core/testing';
import { CursoService } from "./cursos.service.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Curso } from "../shared/models/curso";
import {Observable, of} from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";


describe('CursosServiceService', () => {
  let service: CursoService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CursoService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("el servicio retorna un arreglo de datos mockeados", (done: DoneFn)=>{
    let fechaPrueba = new Date()
    const mockDatos: Curso[] = [
      {
        "nombre": "Python 3",
        "profesor": "Profesor 1",
        "fechaInicio": fechaPrueba,
        "duracionHoras": 20,
        "alumnos": [],
        "id": 1
      },
      {
        "nombre": "React",
        "profesor": "Profesor 2",
        "fechaInicio": fechaPrueba,
        "duracionHoras": 10,
        "alumnos": [],
        "id": 2
      }
    ];

    httpClientSpy.get.and.returnValue(of(mockDatos));

    service.obtenerCursos().subscribe((cursos: Curso[]) => {
      expect(cursos).toEqual(mockDatos);
      done();
    });
  });

});
