import { Component, Input, OnInit } from '@angular/core';
import { database } from 'firebase';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() public usuario: any;
  constructor(public db: DataService) { }

  ngOnInit(): void {
  }
  onModificar() {
    if (this.usuario['tipo'] == 'admin') {
      this.db.update('usuarios', this.usuario.$key, {
        nombre: this.usuario['nombre'],
        apellido: this.usuario['apellido'],
        email: this.usuario['email'],
        tipo: this.usuario['tipo']
      });
    } else if (this.usuario['tipo'] == 'profesional') {
      this.db.update('usuarios', this.usuario.$key, {
        nombre: this.usuario['nombre'],
        apellido: this.usuario['apellido'],
        email: this.usuario['email'],
        tipo: this.usuario['tipo'],
        profesiones: this.usuario['profesiones'],
        activo: this.usuario.activo,
      });
    } else {
      this.db.update('usuarios', this.usuario.$key, {
        nombre: this.usuario['nombre'],
        apellido: this.usuario['apellido'],
        email: this.usuario['email'],
        tipo: this.usuario['tipo'],
        foto1: this.usuario.foto1,
        foto2: this.usuario.foto2
      });
    }
    this.onCancelar();
  }
  onAutorizar() {
    this.usuario.activo = true;
    this.onModificar();
  }
  onBorrar() {
    this.db.delete('usuarios', this.usuario.$key);
    this.onCancelar();
  }
  onCancelar() {
    this.usuario = null;
  }
}
