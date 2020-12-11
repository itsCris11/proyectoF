import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LibroModel } from '../../Models/libros';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  url = `https://equipo2-4e-2do-parcial-awos.herokuapp.com`;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  obtenerLibros(){
    return this.http.get(`${this.url}/libro`).toPromise();
  }

  // tslint:disable-next-line: typedef
  registrarLibro(pro: LibroModel){
    return this.http.post(`${this.url}/libro`, pro).toPromise();
  }

  // tslint:disable-next-line: typedef
  actualizarLibro(pro: LibroModel, id: string){
    return this.http.put(`${this.url}/libro/${id}`, pro).toPromise();
  }

  // tslint:disable-next-line: typedef
  eliminarLibro(id: string){
    return this.http.delete(`${this.url}/libro/${id}`).toPromise();
  }

}
