import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { ToolbarComponent } from './componentes/toolbar/toolbar.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AuthService } from './servicios/auth.service';
import { DataService } from './servicios/data.service';
import { StorageService } from './servicios/storage.service';
import { ListadosComponent } from './componentes/listados/listados.component';
import { ListadoPacientesComponent } from './componentes/listado-pacientes/listado-pacientes.component';
import { ListadoProfesionalesComponent } from './componentes/listado-profesionales/listado-profesionales.component';
import { ListadoAdministradoresComponent } from './componentes/listado-administradores/listado-administradores.component';
import { ListadoPendientesComponent } from './componentes/listado-pendientes/listado-pendientes.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    PrincipalComponent,
    LoginComponent,
    RegistroComponent,
    ListadosComponent,
    ListadoPacientesComponent,
    ListadoProfesionalesComponent,
    ListadoAdministradoresComponent,
    ListadoPendientesComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule
  ],
  providers: [AuthService, DataService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
