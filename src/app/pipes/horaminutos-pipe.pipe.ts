import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horaminutosPipe'
})
export class HoraminutosPipePipe implements PipeTransform {

  transform(value: string): string {
    let horario = value.split(':');
    let horas = horario[0];
    let minutos = horario[1];
    if(horas.length == 1){
      horas = '0'+horas;
    }
    if(minutos.length == 1){
      minutos = minutos + '0';
    }
    const horarioPipe = horas +':'+ minutos;
    return horarioPipe;
  }

}
