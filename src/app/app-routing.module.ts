import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoAdministradoresComponent } from './componentes/listado-administradores/listado-administradores.component';
import { ListadoPacientesComponent } from './componentes/listado-pacientes/listado-pacientes.component';
import { ListadoPendientesComponent } from './componentes/listado-pendientes/listado-pendientes.component';
import { ListadoProfesionalesComponent } from './componentes/listado-profesionales/listado-profesionales.component';
import { ListadosComponent } from './componentes/listados/listados.component';
import { LoginComponent } from './componentes/login/login.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { SistemadeturnosComponent } from './componentes/sistemadeturnos/sistemadeturnos.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'Registro', component: RegistroComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'sistemadeturnos', component: SistemadeturnosComponent},
  { path: 'listados', component: ListadosComponent
   ,children:[
     { path: 'pacientes', component: ListadoPacientesComponent},
     { path: 'profesionales', component: ListadoProfesionalesComponent},
     { path: 'pendientes', component: ListadoPendientesComponent},
     { path: 'administradores', component: ListadoAdministradoresComponent},
   ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
