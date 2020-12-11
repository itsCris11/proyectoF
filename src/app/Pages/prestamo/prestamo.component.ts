import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { PrestamoModel } from '../../Models/prestamos';
import { PrestamosService } from '../../Services/prestamos/prestamos.service';
import { LibroModel } from '../../Models/libros';
import { LibrosService } from '../../Services/libros/libros.service';
import { UsuariosService } from '../../Services/usuarios/usuarios.service';
import { UsuarioModel } from '../../Models/usuarios';

 
const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  showConfirmButton: false,
  timer: 3000,
})

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']

})
export class PrestamoComponent implements OnInit {
  prestamo: PrestamoModel = new PrestamoModel();
  prestamos:any[]=[];
  @Output() salida = new EventEmitter();
  users:any[]=[];
  idP: any;
  idPreActualizar: String;
  libro: LibroModel = new LibroModel();
  libros:any[]=[];
  usuario: UsuarioModel = new UsuarioModel();


  constructor( private pS: PrestamosService, private lS: LibrosService, private uS: UsuariosService) { }

  ngOnInit(): void {
    this.obtenerPrestamo();
    this.obtenerLibro();
    this.obtenerUsuarios();
  }

  obtenerPrestamo(){
    this.pS.obtenerPrestamos().then((data:any)=>{
      this.prestamos=data.prestamos;
    }).catch((error) => {
      console.log(error);
      Toast.fire(error.console.error.msg, '', 'error');
    });
    console.log(this.prestamos);
  }

  obtenerLibro(){
    this.lS.obtenerLibros().then((data:any)=>{
      this.libros=data.productos;
    }).catch((error) => {
      console.log(error);
      Toast.fire(error.console.error.msg, '', 'error');
    });
    console.log(this.libros);
  }

  obtenerUsuarios(){
    this.uS.obtenerUsuarios().then((data: any) => {
      this.users= (data.usuarios);
    }).catch((error) => {
      console.log(error);
      Toast.fire(error.console.error.msg, '', 'error');
    });
    console.log(this.users);
  }

  registrarPrestamo(forma: NgForm){
      this.pS.registrarPrestamo(this.prestamo).then((resp:any)=>{
      console.log(resp);
      Toast.fire(resp.msg, '', 'success');
      forma.reset();
      this.salida.emit();
    }).catch(error=>{
      console.log(error);
      Toast.fire(error.console.error.msg, '', 'error');
    })
    console.log(this.prestamo);
  }

    getId( idPre: string){
      this.idP = idPre;
      console.log(this.idP)
    }

      eliminarPrestamo(){
      this.pS.eliminarPrestamo(this.idP).then((data: any) => {
        this.prestamo = data;
        Toast.fire(data.msg, '', 'success');
        this.salida.emit();
      }).catch( (error) => {
        Toast.fire(error.error.msg, '', 'error');
        console.log(error)
        this.salida.emit();
      })
      console.log(this.prestamo);
    }


      actualizarPrestamo(){
    this.pS.actualizarPrestamo(this.prestamo, this.idP).then((data: any) => {
      this.prestamo=data;
      Toast.fire(data.msg, '', 'success')
                console.log(this.prestamo);
      this.salida.emit();
    }).catch((error: any) => {
      Toast.fire(error.error.msg, '', 'error');
      this.salida.emit();
    })
  }


}
