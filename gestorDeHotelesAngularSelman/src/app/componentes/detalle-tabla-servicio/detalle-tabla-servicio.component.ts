

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Servicio } from 'src/app/modelos/servicios.model';
import { ServicioService } from 'src/app/servicios/servicio.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-tabla-servicio',
  templateUrl: './detalle-tabla-servicio.component.html',
  styleUrls: ['./detalle-tabla-servicio.component.scss'],
  providers: [UsuarioService,ServicioService],
})
export class DetalleTablaServicioComponent implements OnInit {
  public token;
  public servicios;
  public usuarios;
  public idServicioModel: Servicio;
  public serviciosModelGet: Servicio;
  public serviciosModelAdd: Servicio;
  public serviciosModelGetId: Servicio;
  constructor(

    public _usuarioService: UsuarioService,
    public _servicioService: ServicioService
  ) {
    this.token = this._usuarioService.getToken();
    this.idServicioModel = new Servicio(
      '',
      '',
      '',
      0,
      '',
      ''
    );
   }

   ngOnInit(): void {
    this.obtenerServicios();

  }

  obtenerServicios() {
    this._servicioService.obtenerServicios(this.token).subscribe(
      (response) => {
        this.serviciosModelGet = response.serviciosEncontrados;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  obtenerServicio(idServicio){
    this._servicioService.obtenerServicioId(this.token, idServicio).subscribe(
      response => {
        this.serviciosModelGetId =response.servicioEncontrado;
        console.log(response);
      }
    )
  }
}

