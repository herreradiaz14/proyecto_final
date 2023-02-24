import { Inscripcion } from "./inscripcion";
import {Alumno} from "./alumno";

export interface Curso{
  id: number;
  nombre: string;
  profesor: string;
  duracionHoras: number;
  fechaInicio: Date;
  alumnos?: Alumno[];
}
