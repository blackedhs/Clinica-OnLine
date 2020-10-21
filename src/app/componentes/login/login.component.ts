import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
  constructor() { }

  ngOnInit(): void {
  }
  onAceptar(){
    const {email,password} = this.formControl.value;
    console.log(email,password);
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
