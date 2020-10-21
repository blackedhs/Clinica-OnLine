import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public formRegistro = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl(''),
    tipo: new FormControl(''),
    password: new FormControl(''),
  })
  constructor() { }

  ngOnInit(): void {
  }
  onRegistrar() {
    console.log(this.formRegistro.value);
  }
  onLimpiar() {
    this.formRegistro.setValue({
      nombre: '',
      apellido: '',
      email: '',
      tipo: '',
      password: '',
    });
  }
}
