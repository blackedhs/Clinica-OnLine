import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
    profesiones: new FormControl(''),
  });
  public labelFoto1 = 'Seleccione la foto 1';
  public labelFoto2 = 'Seleccione la foto 2';
  public urlImage2: Observable<string>;
  public urlImage1: Observable<string>;
  public flagPaciente = false;
  public flagProfesional = false;
  public flagAdmin = false;
  public flagIsAdmin = false;
  public flagForm = false;
  public file1: any;
  public file2: any;
  public foto1: string;
  public foto2: string;
  constructor(public db: DataService, public fAuth: AuthService, public storage: AngularFireStorage, public router: Router) { }

  ngOnInit(): void {
    this.db.getdb('usuarios');
  }
  onCharge(event, nFoto) {
    if (nFoto == '1') {
      this.labelFoto1 = event.target.files[0].name;
      this.file1 = event.target.files[0];
    } else {
      this.labelFoto2 = event.target.files[0].name;
      this.file2 = event.target.files[0];
    }
  }
  cargarFotos() {
    ///carga imagen 1
    let id = Math.random().toString(36).substring(2);
    let filePath = 'imagenes/foto1_' + id;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.file1);
    task.snapshotChanges().pipe(finalize(() => this.urlImage1 = ref.getDownloadURL())).subscribe();
    ///carga imagen 2
    id = Math.random().toString(36).substring(2);
    filePath = 'imagenes/foto2_' + id;
    const ref2 = this.storage.ref(filePath);
    const task2 = this.storage.upload(filePath, this.file2);
    task2.snapshotChanges().pipe(finalize(() => this.urlImage2 = ref2.getDownloadURL())).subscribe();
    //Recibo las urls
    setTimeout(() => {
      this.urlImage1.subscribe(url => this.foto1 = url);
      this.urlImage2.subscribe(url => this.foto2 = url);
    }, 1500);
  }
  onRegistrar() {
    this.fAuth.register(this.formRegistro.value['email'], this.formRegistro.value['password']).then(() => {
      if (this.formRegistro.value['tipo'] == 'admin') {
        this.db.setdb('usuarios', {
          nombre: this.formRegistro.value['nombre'],
          apellido: this.formRegistro.value['apellido'],
          email: this.formRegistro.value['email'],
          tipo: this.formRegistro.value['tipo']
        });
      } else if (this.formRegistro.value['tipo'] == 'profesional') {
        this.db.setdb('usuarios', {
          nombre: this.formRegistro.value['nombre'],
          apellido: this.formRegistro.value['apellido'],
          email: this.formRegistro.value['email'],
          tipo: this.formRegistro.value['tipo'],
          profesiones: this.formRegistro.value['profesiones'],
          activo: false,
        });
        this.fAuth.logout();
        alert ('Registro correcto, Aguarde a autorizacion de un administrador');
        this.router.navigate(['']);
      } else {
        this.cargarFotos();
        setTimeout(() => {
          this.fAuth.SendVerificationMail();
          this.db.setdb('usuarios', {
            nombre: this.formRegistro.value['nombre'],
            apellido: this.formRegistro.value['apellido'],
            email: this.formRegistro.value['email'],
            tipo: this.formRegistro.value['tipo'],
            foto1: this.foto1,
            foto2: this.foto2
          });
          alert('Registro exitoso. Verifique su Email para validar su registro');
          this.fAuth.logout();
          this.router.navigate(['']);
        }, 3000);
      }
    }).catch(error => alert('registro incorrecto ' + error));
  }
  onLimpiar() {
    this.formRegistro.setValue({
      nombre: '',
      apellido: '',
      email: '',
      tipo: '',
      password: '',
      profesiones: '',
    });
    this.onSelect();
  }
  onSelect() {
    if (this.formRegistro.value['tipo'] == 'admin') {
      this.flagAdmin = true;
      this.flagForm = false;
      this.flagPaciente = false;
      this.flagProfesional = false;
    } else if (this.formRegistro.value['tipo'] == 'paciente') {
      this.flagAdmin = false;
      this.flagProfesional = false;
      this.flagForm = true;
      this.flagPaciente = true;
    } else if (this.formRegistro.value['tipo'] == 'profesional') {
      this.flagAdmin = false;
      this.flagPaciente = false;
      this.flagForm = true;
      this.flagProfesional = true;
    } else {
      this.flagForm = false;
      this.flagIsAdmin =false;
      this.flagAdmin = false;
    }
  }
  onAutorizar(){
    this.fAuth.login(this.formRegistro.value['email'],this.formRegistro.value['password'])
              .then(()=>{ 
                this.flagAdmin = false;
                this.flagIsAdmin = true;
                this.flagForm = true; 
                this.fAuth.logout();})
              .catch(()=> alert('Error en la Autorizacion'));
  }
}
