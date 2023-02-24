import { Alumno } from "./alumno";
import { Curso } from "./curso";

export interface Inscripcion{
  id: number;
  fecha: Date;
  pago: number;
  curso: Curso;
  isActive: boolean;
}
