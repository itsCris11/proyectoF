import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../Models/usuarios';
import { UsuariosService } from '../../Services/usuarios/usuarios.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  showConfirmButton: false,
  timer: 3000,
})

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'] 
})
export class UsuarioComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  @Output() salida = new EventEmitter();
  users:any[]=[];
  idU: any;
  active: boolean;
 
  constructor( private uS: UsuariosService ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  // tslint:disable-next-line: typedef
  obtenerUsuarios(){
    this.uS.obtenerUsuarios().then((data: any) => {
      this.users= (data.usuarios);
      console.log(this.users);
    }).catch((error) => {
      console.log(error);
      Toast.fire(error.console.error.msg, '', 'error');
    });
  }

  // tslint:disable-next-line: typedef
  registrarUsuario(forma: NgForm){
    this.uS.registrarUsuario(this.usuario).then((resp: any) => {
      Toast.fire(resp.msg, '', 'success');
      this.salida.emit();
    }).catch((error) => {
      console.log(error);
      Toast.fire(error.console.error.msg, '', 'error');
      this.salida.emit();
    });
    console.log(this.usuario);
    forma.reset();
  }

  /*eliminarUsuario(usuario: UsuarioModel){
    Swal.fire({
      title:`¿Estas seguro que deseas eliminar a ${usuario.nombre}`,
      text: 'No se pueden revertir los cambios',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value){
      this.uS.eliminarUsuario(usuario._id).then((usuario: any) => {
        Toast.fire(usuario.msg, '', 'success');
      }).catch((error: any) => {
        Toast.fire(error.error.msg, '', 'error');
      });
    }
    });*/

    eliminarUsuario(){
      this.uS.eliminarUsuario(this.idU).then((data: any) => {
        this.usuario = data;
        Toast.fire(data.msg, '', 'success');
        this.salida.emit();
      }).catch( (error) => {
        Toast.fire(error.error.msg, '', 'error');
        console.log(error)
        this.salida.emit();
      })
      console.log(this.usuario);
    }

    getId( idUser: string){
      this.idU = idUser;
      console.log(this.idU)
    }

  actualizarUsuario(){
    this.uS.actualizarUsuario(this.usuario, this.idU).then((data: any) => {
      this.usuario=data;
      Toast.fire(data.msg, '', 'success')
      this.salida.emit();
    }).catch((error: any) => {
      Toast.fire(error.error.msg, '', 'error');
      this.salida.emit();
    })
          console.log(this.usuario);
  }


}
