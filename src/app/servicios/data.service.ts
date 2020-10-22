import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public listaUsuarios: AngularFireList<any>;

  constructor(public firedb:AngularFireDatabase) { }
  getdb(coleccion:string){
    if (coleccion == 'usuarios'){
      this.listaUsuarios = this.firedb.list(coleccion);
      return this.listaUsuarios;
    }
  }
  setdb(coleccion:string, objeto:object){
    if (coleccion == 'usuarios'){
      return this.listaUsuarios.push(objeto);
    }
  }
  update(coleccion:string,key:string ,objeto:object){
    if (coleccion == 'usuarios'){
      return this.listaUsuarios.update(key,objeto);
    }
  }
  delete(coleccion:string, key:string){
    if (coleccion == 'usuarios'){
      return this.listaUsuarios.remove(key);
    }
  }
}
