import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-sistemadeturnos',
  templateUrl: './sistemadeturnos.component.html',
  styleUrls: ['./sistemadeturnos.component.css']
})
export class SistemadeturnosComponent implements OnInit {
  public profesional:any
  public date: string;
  public turnoSelected:any;
  public turno = new Turno();
  constructor() { }

  ngOnInit(): void {
  }
  onCalendario(dateString){
    this.turno.dia = dateString;
    let date = new Date(dateString);
    this.date = date.toString().split(' ',1).toString();
  }
}
