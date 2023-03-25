import { Alumno } from "./alumno";
import { Curso } from "./curso";

export interface Inscripcion{
  id: string;
  fecha: Date;
  pago: number;
  curso: Curso;
  isActive: boolean;
}
