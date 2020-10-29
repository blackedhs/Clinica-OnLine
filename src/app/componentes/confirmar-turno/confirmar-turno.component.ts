import { Component, Input, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-confirmar-turno',
  templateUrl: './confirmar-turno.component.html',
  styleUrls: ['./confirmar-turno.component.css']
})
export class ConfirmarTurnoComponent implements OnInit {
  @Input() public turnoInput = new Turno();
  constructor() { }

  ngOnInit(): void {
  }
  onConfirmar(){

  }
  onCancelar(){
    
  }

}
