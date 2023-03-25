import { Inscripcion } from "./inscripcion";

export interface Alumno{
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  edad: number;
  estaMatriculado: boolean;
  inscripciones?: Inscripcion[];
  isActive?: boolean;
}
