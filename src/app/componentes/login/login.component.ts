import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formControl = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  public isPaciente = false;
  public isProfesional = false;
  public isActive = false;
  public usuarios = [];
  constructor(public fAuth: AuthService, public router: Router, public db: DataService) { }

  ngOnInit(): void {
    this.db.getdb('usuarios').snapshotChanges().subscribe(datos => {
      this.usuarios = [];
      datos.forEach(element => {
        this.usuarios.push(element.payload.toJSON());
      });
    });
  }
  onAceptar() {
    const { email, password } = this.formControl.value;
    this.usuarios.forEach(element => {
      if (element.email == email && element.tipo == 'paciente') {
        this.isPaciente = true;
        return;
      }
      if (element.email == email && element.tipo == 'profesional') {
        this.isActive = element.activo;
        this.isProfesional = true;
        return;
      }
    })
    this.fAuth.login(email, password)
      .then(result => {
        if (this.isPaciente && !result.user.emailVerified) {
          alert('Debe de verificar su email');
          this.fAuth.logout();
        } else if (this.isProfesional && !this.isActive){
          alert('Debe esperar que un administrador valide su registro');
          this.fAuth.logout();
        }else{
          this.router.navigate(['']);
        }
      }).catch(error => alert('Error en login ' + error.message));
  }
  onAdmin() {
    this.formControl.setValue({
      email: 'admin@admin.com',
      password: '123456'
    })
  }
  onPaciente() {
    this.formControl.setValue({
      email: 'fede@noloce.com',
      password: '123456'
    })
  }
  onProfesional() {
    this.formControl.setValue({
      email: 'juan@gonzalez.com',
      password: '123456'
    })
  }
}
