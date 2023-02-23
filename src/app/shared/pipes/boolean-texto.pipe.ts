import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanTexto'
})
export class BooleanTextoPipe implements PipeTransform {

  transform(value: boolean,): string {
    return value ? 'SI' : 'NO';
  }

}
