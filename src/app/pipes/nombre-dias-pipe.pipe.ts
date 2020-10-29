import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreDiasPipe'
})
export class NombreDiasPipePipe implements PipeTransform {

  transform(value: string): string {
    switch (value){
      case 'Mon':
          return 'Lunes';
      case 'Tue':
          return 'Martes';
      case 'Wed':
          return 'Miercoles';
      case 'Thu':
          return 'Jueves';
      case 'Fri':
          return 'Viernes';
      case 'Sat':
          return 'Sabado';
      case 'Sun':
          return 'Domingo';
        
    }
    return null;
  }

}
