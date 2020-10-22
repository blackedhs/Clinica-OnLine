import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.css']
})
export class ListadoPacientesComponent implements OnInit {
  @Input() public pacientes;
  @Output() public usuarioSel = new EventEmitter;
  constructor() { }

  ngOnInit(): void {
  }
  onTr(usuario){
    this.usuarioSel.emit(usuario);
  }
}
