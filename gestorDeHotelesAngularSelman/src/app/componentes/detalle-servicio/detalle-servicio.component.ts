import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Servicio } from 'src/app/modelos/servicios.model';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-detalle-encuesta',
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.scss'],
  providers: [UsuarioService, ServicioService],
})
export class DetalleServicioComponent implements OnInit {
  public servicioModel;
  public token;
  public idServicioRuta: string;
  constructor(
    public _usuarioService: UsuarioService,
    public _servicioService: ServicioService,
    public _activatedRoute: ActivatedRoute
  ) {
    this.token = this._usuarioService.getToken();
    this.servicioModel = new Servicio(
      '',
      '',
      '',
      0,
      '',
      ''
    );
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idServicioRuta = dataRuta.get('idServicio');
    });
    this.obtenerServicioId(this.idServicioRuta);
  }

  obtenerServicioId(idServicio) {
    this._servicioService
      .obtenerServicioId(this.token, idServicio)
      .subscribe((response) => {
        this.servicioModel = response.servicioEncontrado;
        console.log(response);
      });
  }
}
