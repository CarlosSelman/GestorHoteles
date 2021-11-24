import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoEvento } from 'src/app/modelos/tipoEvento.model';
import { TipoEventoService } from 'src/app/servicios/tipo-Evento.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-tipo-evento',
  templateUrl: './detalle-tipo-evento.component.html',
  styleUrls: ['./detalle-tipo-evento.component.scss'],
  providers: [TipoEventoService, UsuarioService],
})
export class DetalleTipoEventoComponent implements OnInit {
  public tipoEventoModel;
  public token;
  public idTipoEventoRuta: string;
  constructor(
    public _usuarioService: UsuarioService,
    public _tipoEventoService: TipoEventoService,
    public _activatedRoute: ActivatedRoute
  ) {
    this.token = this._usuarioService.getToken();
    this.tipoEventoModel = new TipoEvento(
      '',
      '',
      '',
      '',
      ''
    );
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idTipoEventoRuta = dataRuta.get('idTipoEvento');
    });
    this.obtenerTipoEventoId(this.idTipoEventoRuta);
  }

  obtenerTipoEventoId(idTipoEvento) {
    this._tipoEventoService
      .obtenerTipoEventoId(this.token, idTipoEvento)
      .subscribe((response) => {
        this.tipoEventoModel = response.tipoEventoEncontrado;
        console.log(response);
      });
  }

}
