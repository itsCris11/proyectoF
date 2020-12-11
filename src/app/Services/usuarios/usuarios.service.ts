import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../../Models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = `https://equipo2-4e-2do-parcial-awos.herokuapp.com`;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  obtenerUsuarios(){
    return this.http.get(`${this.url}/usuario`).toPromise();
  }

  // tslint:disable-next-line: typedef
  registrarUsuario(usr: UsuarioModel){
    return this.http.post(`${this.url}/usuario`, usr).toPromise();
  }

  // tslint:disable-next-line: typedef
  actualizarUsuario( usr: UsuarioModel, id: string){
    return this.http.put(`${this.url}/usuario/${id}`, usr).toPromise();
  }

  // tslint:disable-next-line: typedef
  eliminarUsuario(id: string ){
    return this.http.delete(`${this.url}/usuario/${id}`).toPromise();
  }


   // LOGIN
   loginUsuario(usr: UsuarioModel){
         return this.http.post(`${this.url}/login`, usr).toPromise();
   }
}
