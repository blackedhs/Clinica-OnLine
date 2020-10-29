import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventsService } from 'src/app/servicios/events.service';

@Component({
  selector: 'app-calendario-dia',
  templateUrl: './calendario-dia.component.html',
  styleUrls: ['./calendario-dia.component.css']
})
export class CalendarioDiaComponent implements OnInit {
  @Output() public turnoOut = new EventEmitter;
  @Input() public dateInput
  public horarios = [[]];
  public tablaHorarios = [[]];
  public date: Date;
  public hora = new Date('01/01/2020');
  constructor(public as: EventsService) { }
  ngOnInit(): void {
    this.as.date.subscribe(() => this.prepararTable());
  }
  onDateInput() {
    console.log('si anda me voy');
  }
  prepararTable() {
    if (this.dateInput != 'Sun') {
      if (this.dateInput != 'Sat') {
        this.hora.setHours(8);
        for (let y = 0; y < 5; y++) {
          this.horarios[y] = [];
          for (let x = 0; x < 5; x++) {
            const tdHorario = {
              horario: this.hora.getHours() + ':' + this.hora.getMinutes(),
              style: '',
              disable: false,
            }
            this.hora.setMinutes(this.hora.getMinutes() + 30);
            this.horarios[y].push(tdHorario);
            if (y == 4 && x == 1) {
              x = 5;
            }
          }
        }
      } else {
        this.horarios = [[]];
        this.hora.setHours(8);
        for (let y = 0; y < 4; y++) {
          this.horarios[y] = [];
          for (let x = 0; x < 3; x++) {
            const tdHorario = {
              horario: this.hora.getHours() + ':' + this.hora.getMinutes(),
              style: '',
              disable: false,
            }
            this.hora.setMinutes(this.hora.getMinutes() + 30);
            this.horarios[y].push(tdHorario);
          }
        }
      }

    } else {
      this.horarios = [[]];
    }
    this.tablaHorarios = this.horarios;
  }

  armoHorarios(tdHorario) {
    this.tablaHorarios.forEach(element => {
      element.forEach(element => {
        element.style = '';
        if (element.horario == tdHorario.horario) {
          element.style = 'td-select';
          this.turnoOut.emit(element.horario);
        }
      })
    })

  }
  onTd(hora) {
    console.log(hora);
  }
}
