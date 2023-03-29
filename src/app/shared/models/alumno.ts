import { Inscripcion } from "./inscripcion";

export interface Alumno{
  id: string;
  nombre: string;
  apellido: string;
  perfil?: string;
  inscripciones?: Inscripcion[];
  sexo?: boolean;
  isActive?: boolean;
}
