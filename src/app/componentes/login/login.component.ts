import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formControl = new FormGroup({
    email : new FormControl(''),
    password: new FormControl('')
  })
  constructor(public fAuth:AuthService, public router:Router) { }

  ngOnInit(): void {
  }
  onAceptar(){
    const {email,password} = this.formControl.value;
    this.fAuth.login(email,password)
              .then(()=> this.router.navigate(['']))
              .catch(error=> alert('Error en login '+error));
  }
  onAdmin(){
    this.formControl.setValue({
      email: 'admin@admin.com',
      password:'123456'
    })
  }
  onPaciente(){
    this.formControl.setValue({
      email: 'admin@admin.com',
      password:'123456'
    })
  }
  onProfesional(){
    this.formControl.setValue({
      email: 'admin@admin.com',
      password:'123456'
    })
  }
}
