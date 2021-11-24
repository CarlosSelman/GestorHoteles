import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoEvento } from 'src/app/modelos/tipoEvento.model';
import { TipoEventoService } from 'src/app/servicios/tipo-Evento.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-evento',
  templateUrl: './tipo-evento.component.html',
  styleUrls: ['./tipo-evento.component.scss'],
  providers: [TipoEventoService, UsuarioService],
})
export class TipoEventoComponent implements OnInit {
  public token;
  public tiposEventosModelGet: TipoEvento;
  public tiposEventosModelAdd: TipoEvento;
  public tiposEventosModelGetId: TipoEvento;

  constructor(

    public _tipoEventoService: TipoEventoService,
    public _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.token = this._usuarioService.getToken();
    this.tiposEventosModelGetId = new TipoEvento(
      '',
      '',
      '',
      '',
      ''
    );
    this.tiposEventosModelAdd = new TipoEvento(
      '',
      '',
      '',
      '',
      ''
    );
  }

  ngOnInit(): void {
    this.obtenerTiposEventos();
  }

  obtenerTiposEventos() {
    this._tipoEventoService.obtenerTiposEventos(this.token).subscribe(
      (response) => {
        this.tiposEventosModelGet = response.tiposEventosEncontrados;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  obtenerTipoEvento(idTipoEvento){
    this._tipoEventoService.obtenerTipoEventoId(this.token, idTipoEvento).subscribe(
      response => {
        this.tiposEventosModelGetId =response.tipoEventoEncontrado;
        console.log(response);
      }
    )
  }

  agregarTiposEventos() {

    if(this.tiposEventosModelAdd.nombre ===""||this.tiposEventosModelAdd.descripcion===""){
      Swal.fire({
        /*position: 'top',*/
        icon: 'warning',
        title: 'Llene todos los campos',
        showConfirmButton: false,
        timer: 1500,
      });
    }else{

      this._tipoEventoService.agregarTipoEvento(this.tiposEventosModelAdd, this.token).subscribe(
      response=>{
        this.tiposEventosModelAdd.nombre = '';
        this.tiposEventosModelAdd.descripcion ='';
        this.tiposEventosModelAdd.imagen ='';
        console.log(response);

        Swal.fire({
          /*position: 'top',*/
          icon: 'success',
          title: 'Tipo de Evento agregado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });

        this.obtenerTiposEventos()
      }
    );
    }
  }

  editarTipoEvento(){

      if(this.tiposEventosModelGetId.nombre===""||this.tiposEventosModelGetId.descripcion===""){

        Swal.fire({
          /*position: 'top',*/
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
      }else{

      this._tipoEventoService.editarTipoEvento(this.tiposEventosModelGetId).subscribe(
        response=>{
          console.log(response);

          Swal.fire({
            /*position: 'top',*/
            icon: 'success',
            title: 'Tipo de Evento editado y actualizado correctamente',
            showConfirmButton: false,
            timer: 1500,
          });

          this.obtenerTiposEventos();
        }
      )
    }
  }

  eliminarTipoEvento(idTipoEvento){
    this._tipoEventoService.eliminarTipoEvento(idTipoEvento).subscribe(
      response=>{
        console.log(response);
        this.obtenerTiposEventos();
      }
    )
  }

  //Otra manera de Navegar con Parametros
  navegarDetalleTipoEvento(idTipoEvento) {
    this._router.navigate(['/detalleTipoEvento', idTipoEvento]);
  }
}









