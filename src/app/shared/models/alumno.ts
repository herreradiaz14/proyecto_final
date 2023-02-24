import { Inscripcion } from "./inscripcion";

export interface Alumno{
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  edad: number;
  estaMatriculado: boolean;
  inscripciones?: Inscripcion[];
  isActive?: boolean;
}
