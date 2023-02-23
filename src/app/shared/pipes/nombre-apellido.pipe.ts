import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreApellido'
})
export class NombreApellidoPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    let nombreCompleto = value;
    if(args.length > 0){
      nombreCompleto = nombreCompleto + ' ' + args[0];
    }
    return nombreCompleto;
  }

}
