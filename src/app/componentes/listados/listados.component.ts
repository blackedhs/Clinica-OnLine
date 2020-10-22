import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})
export class ListadosComponent implements OnInit {
  public pacientes;
  public profesionales;
  public pendientes;
  public administradores;
  public usuario;
  constructor(public db:DataService) { }

  ngOnInit(): void {
    this.db.getdb('usuarios').snapshotChanges().subscribe(datos=>{
      this.pacientes = [];
      this.profesionales = [];
      this.pendientes = [];
      this.administradores = [];
      datos.forEach(element=>{
        const x = element.payload.toJSON();
        x['$key']=element.key;
        switch ( x['tipo']){
          case 'admin':
                this.administradores.push(x);
            break;
          case 'profesional':
                if (x['activo'])
                  this.profesionales.push(x);
                else
                  this.pendientes.push(x);
            break;
          case 'paciente':
              this.pacientes.push(x);
            break;
        }
      });
    });
  }
  onEmit(user){
    this.usuario = user;
  }
}
