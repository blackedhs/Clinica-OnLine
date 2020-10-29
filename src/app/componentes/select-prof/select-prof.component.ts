import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-select-prof',
  templateUrl: './select-prof.component.html',
  styleUrls: ['./select-prof.component.css']
})
export class SelectProfComponent implements OnInit {
  @Output() public profEmit = new EventEmitter;
  @Output() public espEmit = new EventEmitter;
  public especialidades = [];
  public profesionales = [];
  public profEspecialidad = [];
  public especialidad: string;
  public especialidadAfiltrar: string;
  public profesional: string;
  public flagProf = false;
  constructor(public db: DataService) { }

  ngOnInit(): void {
    this.db.getdb('usuarios').snapshotChanges().subscribe(dato => {
      this.especialidades = [];
      this.profesionales = [];
      this.especialidadAfiltrar = '';
      dato.forEach(element => {
        const user = element.payload.toJSON();
        if (user["tipo"] == 'profesional') {
          this.profesionales.push(user);
          this.especialidadAfiltrar += user['profesiones'] + ',';
        }
      });
      this.armoEspecialidades();
    })
  }
  onEspecialidad() {
    this.flagProf = true;
    this.profEspecialidad = [];
    this.profesionales.forEach(element =>{
      const pr = element['profesiones'].split(',');
      pr.forEach(ele=> {
        if(ele == this.especialidad){
          this.profEspecialidad.push(element);
          this.profesional = element;
        }
      })
    });
    this.espEmit.emit(this.especialidad);
    this.profEmit.emit(null);
  }
  onProfesional(prof ?) {
    if(prof){
      this.profEmit.emit(prof);
    }else {
      this.profEmit.emit(this.profesional);
    }
  }
  armoEspecialidades() {
    const esp = this.especialidadAfiltrar.split(',');
    esp.forEach(element => this.especialidades.push(element));
    this.especialidades.pop();
    this.especialidades.sort();
    const x = this.especialidades;
    this.especialidades = [];
    for (let index = 0; index < x.length; index++) {
      const element = x[index];
      if (index == 0) {
        this.especialidades.push(element);
      } else if (element != x[index - 1]) {
        this.especialidades.push(element);
      }
    }
  }

}
