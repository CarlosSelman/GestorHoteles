
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoEvento } from 'src/app/modelos/tipoEvento.model';
import { TipoEventoService } from 'src/app/servicios/tipo-Evento.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-detalle-tabla-tipo-evento',
  templateUrl: './detalle-tabla-tipo-evento.component.html',
  styleUrls: ['./detalle-tabla-tipo-evento.component.scss'],
  providers: [UsuarioService,TipoEventoService],
})
export class DetalleTablaTipoEventoComponent implements OnInit {
  public token;
  public tiposEventos;
  public usuarios;
  public idTipoEventoModel: TipoEvento;
  public tiposEventosModelGet: TipoEvento;
  public tiposEventosModelAdd: TipoEvento;
  public tiposEventosModelGetId: TipoEvento;
  constructor(

    public _usuarioService: UsuarioService,
    public _tipoEventoService: TipoEventoService
  ) {
    this.token = this._usuarioService.getToken();
    this.idTipoEventoModel = new TipoEvento(
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
}
