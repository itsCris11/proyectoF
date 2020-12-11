import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
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
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']

})
export class LibroComponent implements OnInit {

  libro: LibroModel = new LibroModel();
  @Output() salida = new EventEmitter();
  libros:any[]=[];
  users:any[]=[];
  idL: any;
  idLibActualizar: String;
  usuario: UsuarioModel = new UsuarioModel();

  constructor( private lS: LibrosService, private uS: UsuariosService ) { }

  ngOnInit(): void {
    this.obtenerLibro();
    console.log(this.libro);
    this.obtenerUsuarios();
  }

  obtenerLibro(){
    this.lS.obtenerLibros().then((data:any)=>{
      this.libros=data.productos;
      console.log(this.libros);
    }).catch((error) => {
      console.log(error);
      Toast.fire(error.console.error.msg, '', 'error');
    });
  }

  obtenerUsuarios(){
    this.uS.obtenerUsuarios().then((data: any) => {
      this.users= (data.usuarios);
                console.log(this.users);
    }).catch((error) => {
      console.log(error);
      Toast.fire(error.console.error.msg, '', 'error');
    });
  }


  registrarLibro(forma: NgForm){
    this.lS.registrarLibro(this.libro).then((resp:any)=>{
      console.log(resp);
      Toast.fire(resp.msg, '', 'success');
      forma.reset();
      this.salida.emit();
    }).catch(error=>{
      console.log(error);
      Toast.fire(error.console.error.msg, '', 'error');
    })
    console.log(this.libro);
  }

     getId( idLib: string){
      this.idL = idLib;
      console.log(this.idL);
    }

      eliminarLibro(){
        this.lS.eliminarLibro(this.idL).then((data: any) => {
        this.libro = data;
        Toast.fire(data.msg, '', 'success');
        this.salida.emit();
      }).catch( (error) => {
        Toast.fire(error.error.msg, '', 'error');
        console.log(error)
        this.salida.emit();
      })
      console.log(this.libro);
    }


      actualizarLibro(){
      this.lS.actualizarLibro(this.libro, this.idL).then((data: any) => {
      this.libro=data;
      Toast.fire(data.msg, '', 'success')
                console.log(this.libro);
      this.salida.emit();
    }).catch((error: any) => {
      Toast.fire(error.error.msg, '', 'error');
      this.salida.emit();
    })
  }

}
