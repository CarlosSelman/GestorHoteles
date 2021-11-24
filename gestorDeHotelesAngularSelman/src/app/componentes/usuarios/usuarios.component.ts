import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario.model';
import { UsuarioService } from "../../servicios/usuario.service";


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {
  public usuarios;
  public idUsuarioModel: Usuario;
  constructor(public _usuarioService: UsuarioService) {
    this.idUsuarioModel = new Usuario("","","","","","","");
   }

  ngOnInit(): void {
    this.obtenerUsuarios();
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
        this.idUsuarioModel = response.usuarioEncontrado;
        console.log(response);

      }
    )
  }

  obtenerUsuarioLogueado(idUsuario){
    this._usuarioService.obtenerUsuarioLogueado(idUsuario).subscribe(
      response=>{
        this.idUsuarioModel = response.usuarioEncontrado;
        console.log(response);

      }
    )
  }

  editarUsuario(){
    this._usuarioService.editarUsaurio(this.idUsuarioModel).subscribe(
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
}
