import { Inscripcion } from "./inscripcion";
import {Alumno} from "./alumno";

export interface Curso{
  id: string;
  nombre: string;
  profesor: string;
  duracionHoras: number;
  fechaInicio: Date;
  alumnos?: Alumno[];
}
