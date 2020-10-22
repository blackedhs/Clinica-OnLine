import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-listado-administradores',
  templateUrl: './listado-administradores.component.html',
  styleUrls: ['./listado-administradores.component.css']
})
export class ListadoAdministradoresComponent implements OnInit {
  @Input() public administradores;
  @Output() public usuarioSel = new EventEmitter;
  constructor() { }

  ngOnInit(): void {
  }
  onTr(usuario){
    this.usuarioSel.emit(usuario);
  }
}
