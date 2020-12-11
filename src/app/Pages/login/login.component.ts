import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../Models/usuarios';
import { UsuariosService } from '../../Services/usuarios/usuarios.service';
import Swal from 'sweetalert2';
 
 
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000,
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

usuario: UsuarioModel = new UsuarioModel();
  @Output() salida = new EventEmitter();
  users:any[]=[];
  idU: any;
  active: boolean;

  constructor( private uS: UsuariosService ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
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

  loginUsuario(){
      this.uS.loginUsuario(this.usuario).then((resp: any) => {
      Toast.fire(resp.msg, '', 'success');
      this.salida.emit();
    }).catch((err) => {
      console.log(err);
      Toast.fire(err.console.err.msg, '', 'error');
      this.salida.emit();
    });
    console.log(this.usuario);
  }

}
