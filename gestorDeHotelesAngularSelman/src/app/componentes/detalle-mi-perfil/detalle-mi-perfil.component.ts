import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario.model';
import { UsuarioService } from "../../servicios/usuario.service";

@Component({
  selector: 'app-detalle-mi-perfil',
  templateUrl: './detalle-mi-perfil.component.html',
  styleUrls: ['./detalle-mi-perfil.component.scss'],
  providers: [UsuarioService]
})
export class DetalleMiPerfilComponent implements OnInit {

public identidad;
  public usuarios;
  public idUsuario: Usuario;
  constructor(public _usuarioService: UsuarioService) {
    this.identidad = this._usuarioService.getIdentidad();
    this.idUsuario = new Usuario("","","","","","","");
   }
  ngOnInit(): void {
    console.log(this.identidad);
  }

  obtenerUsuarioLogueado(idUsuario){
    this._usuarioService.obtenerUsuarioLogueado(idUsuario).subscribe(
      response=>{
        this.idUsuario = response.usuarioEncontrado;
        console.log(response);
      }
    )
  }

  editarUsuario(){
    this._usuarioService.editarUsaurio(this.idUsuario).subscribe(
      response=>{
        console.log(response);
        this.obtenerUsuarios();
      }
    )
  }

  eliminarUsuario(idUsuario){
    this._usuarioService.eliminarUsuario(idUsuario).subscribe(
      response=>{
        console.log(response);
        this.obtenerUsuarios();
      }
    )
  }

  obtenerUsuarios(){
    this._usuarioService.obtenerUsuarios().subscribe(
      response => {
        this.usuarios = response.usuariosEncontrados;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  obtenerUsuarioId(idUsuario){
    this._usuarioService.obtenerUsuarioId(idUsuario).subscribe(
      response=>{
        this.idUsuario = response.usuarioEncontrado;
        console.log(response);

      }
    )
  }

}






