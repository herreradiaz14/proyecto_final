import { Alumno } from "./alumno";
import { Curso } from "./curso";
import {User} from "./user";

export interface Inscripcion{
  id?: string;
  fecha: Date;
  curso: Curso;
  alumno?: Alumno;
  usuarioInscribio?: User;
  isActive: boolean;
}
