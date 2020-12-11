import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrestamoModel } from '../../Models/prestamos';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {
  url = `https://equipo2-4e-2do-parcial-awos.herokuapp.com`;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  obtenerPrestamos(){
    return this.http.get(`${this.url}/prestamo`).toPromise();
  }

  // tslint:disable-next-line: typedef
  registrarPrestamo(pre: PrestamoModel){
    return this.http.post(`${this.url}/prestamo`, pre).toPromise();
  }

  // tslint:disable-next-line: typedef
  actualizarPrestamo(pre: PrestamoModel, id: string){
    return this.http.put(`${this.url}/prestamo/${id}`, pre).toPromise();
  }

  // tslint:disable-next-line: typedef
  eliminarPrestamo(id: string){
    return this.http.delete(`${this.url}/prestamo/${id}`).toPromise();
  }


}
