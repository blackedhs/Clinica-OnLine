import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-listado-profesionales',
  templateUrl: './listado-profesionales.component.html',
  styleUrls: ['./listado-profesionales.component.css']
})
export class ListadoProfesionalesComponent implements OnInit {
  @Input() public profesionales;
  @Output() public usuarioSel = new EventEmitter;
  public expandir = false;
  public masMenos = '-';
  constructor() { }

  ngOnInit(): void {
  }
  onExpandir(){
    this.expandir= !this.expandir;
    if(this.expandir)
      this.masMenos = '+';
    else
      this.masMenos = '-';
  }
  onTr(usuario){
    this.usuarioSel.emit(usuario);
  }
}
