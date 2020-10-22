import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-listado-pendientes',
  templateUrl: './listado-pendientes.component.html',
  styleUrls: ['./listado-pendientes.component.css']
})
export class ListadoPendientesComponent implements OnInit {
  @Input() public pendientes;
  @Output() public usuarioSel = new EventEmitter;
  constructor() { }

  ngOnInit(): void {
  }
  onTr(usuario){
    this.usuarioSel.emit(usuario);
  }
}
