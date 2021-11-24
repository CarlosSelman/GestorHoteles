import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../modelos/usuario.model';
import { UsuarioService } from "../../servicios/usuario.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [UsuarioService]
})
export class RegistroComponent implements OnInit {
  public user: Usuario;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router) {
    this.user = new Usuario("","","","","","","");
   }

  ngOnInit(): void {
  }

  registrar(){
    if(this.user.nombre===""||this.user.usuario===""||this.user.email===""||this.user.password===""){
      Swal.fire({
        /*position: 'top',*/
        icon: 'warning',
        title: 'Llene todos los campos',
        showConfirmButton: false,
        timer: 1500,
      });
    }else{
    console.log(this.user)

    this._usuarioService.registro(this.user).subscribe(
      response=>{
        console.log(response);
        Swal.fire({
          /*position: 'top',*/
          icon: 'success',
          title: 'Cuenta registrada correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this._router.navigate(['/login'])
      },
      (error) => {
        console.log(<any>error);
        Swal.fire({
          /*position: 'top',*/
          icon: 'error',
          title: 'No se pudo registrar la cuenta',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    )
  }
}
}
