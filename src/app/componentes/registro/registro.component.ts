import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
    profesiones: new FormControl('')
  });
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
  constructor(public db: DataService, public fAuth: AuthService, public storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.db.getdb('usuarios');
  }
  onCharge(event, nFoto) {
    if (nFoto = '1') {
      this.file1 = event.target.files[0];
    } else {
      this.file2 = event.target.files[0];
    }
  }
  cargarFotos() {
    ///carga imagen 1
    let id = Math.random().toString(36).substring(2);
    let filePath = 'imagenes/foto1' + id;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.file1);
    task.snapshotChanges().pipe(finalize(() => this.urlImage1 = ref.getDownloadURL())).subscribe();
    ///carga imagen 2
    id = Math.random().toString(36).substring(2);
    filePath = 'imagenes/foto2' + id;
    const ref2 = this.storage.ref(filePath);
    const task2 = this.storage.upload(filePath, this.file1);
    task2.snapshotChanges().pipe(finalize(() => this.urlImage2 = ref2.getDownloadURL())).subscribe();
    //Recibo las urls
    setInterval(() => {
      this.urlImage1.subscribe(url => this.foto1 = url);
      this.urlImage2.subscribe(url => this.foto2 = url);
    }, 2000);
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
        const arrayPorf = this.formRegistro.value['profesiones'].split([',']);
        this.db.setdb('usuarios', {
          nombre: this.formRegistro.value['nombre'],
          apellido: this.formRegistro.value['apellido'],
          email: this.formRegistro.value['email'],
          tipo: this.formRegistro.value['tipo'],
          profesiones: arrayPorf,
          activo: false,
        });
      } else {
        this.cargarFotos();
        setTimeout(() => {
          this.db.setdb('usuarios', {
            nombre: this.formRegistro.value['nombre'],
            apellido: this.formRegistro.value['apellido'],
            email: this.formRegistro.value['email'],
            tipo: this.formRegistro.value['tipo'],
            foto1: this.foto1,
            foto2: this.foto2
          });
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
    console.log(this.formRegistro.value['tipo'])
    if (this.formRegistro.value['tipo'] == 'admin') {
      this.flagAdmin = true;
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
