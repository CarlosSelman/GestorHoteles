import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'src/app/modelos/eventos.model';
import { EventoService } from 'src/app/servicios/evento.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

import { TipoEvento } from 'src/app/modelos/tipoEvento.model';
import { TipoEventoService } from 'src/app/servicios/tipo-Evento.service';

import { Hotel } from 'src/app/modelos/hoteles.model';
import { HotelService } from 'src/app/servicios/hotel.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss'],
  providers: [EventoService, UsuarioService,TipoEventoService,HotelService],
})
export class EventoComponent implements OnInit {
  public token;
  public tiposEventosModelGet: TipoEvento;
  public hotelesModelGet:Hotel;
  public eventosModelGet: Evento;
  public eventosModelAdd: Evento;
  public eventosModelGetId: Evento;

  constructor(

    public _eventoService: EventoService,
    public _usuarioService: UsuarioService,
    public _tipoEventoService: TipoEventoService,
    public _hotelService: HotelService,
    private _router: Router
  ) {
    this.token = this._usuarioService.getToken();
    this.eventosModelGetId = new Evento(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      0,
      '',
      ''
    );
    this.eventosModelAdd = new Evento(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      0,
      '',
      ''
    );
  }

  ngOnInit(): void {
    this.obtenerEventos();
    this.obtenerTiposEventos();
    this.obtenerHoteles();
  }

  obtenerEventos() {
    this._eventoService.obtenerEventos(this.token).subscribe(
      (response) => {
        this.eventosModelGet = response.eventosEncontrados;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  obtenerEvento(idEvento){
    this._eventoService.obtenerEventoId(this.token, idEvento).subscribe(
      response => {
        this.eventosModelGetId =response.eventoEncontrado;
        console.log(response);
      }
    )
  }

  agregarEventos() {

    if(
      this.eventosModelAdd.nombre===""||
      this.eventosModelAdd.descripcion===""||
      this.eventosModelAdd.idTipoEvento===""||
      this.eventosModelAdd.idHotel===""||
      this.eventosModelAdd.fechaInicio===""||
      this.eventosModelAdd.fechaFinal===""||
      this.eventosModelAdd.monto===null
      )

      {
      Swal.fire({
        /*position: 'top',*/
        icon: 'warning',
        title: 'Llene todos los campos',
        showConfirmButton: false,
        timer: 1500,
      });
    }else{

      this._eventoService.agregarEventos(this.eventosModelAdd, this.token).subscribe(
      response=>{

        this.eventosModelAdd.nombre = '';
        this.eventosModelAdd.descripcion ='';
        this.eventosModelAdd.idTipoEvento = '';
        this.eventosModelAdd.idHotel ='';
        this.eventosModelAdd.fechaInicio = '';
        this.eventosModelAdd.fechaFinal ='';
        this.eventosModelAdd.monto =null;
        this.eventosModelAdd.imagen ='';
        console.log(response);

        Swal.fire({
          /*position: 'top',*/
          icon: 'success',
          title: 'Evento agregado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });

        this.obtenerEventos()
      }
    );
    }
  }

  editarEvento(){

      if(
        this.eventosModelGetId.nombre===""||
        this.eventosModelGetId.descripcion===""||
        this.eventosModelGetId.fechaInicio===""||
        this.eventosModelGetId.fechaFinal===""||
        this.eventosModelGetId.monto===null
        )
        {

        Swal.fire({
          /*position: 'top',*/
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
      }else{

      this._eventoService.editarEvento(this.eventosModelGetId).subscribe(
        response=>{
          console.log(response);

          Swal.fire({
            /*position: 'top',*/
            icon: 'success',
            title: 'Evento editado y actualzado correctamente',
            showConfirmButton: false,
            timer: 1500,
          });

          this.obtenerEventos();
        }
      )
    }
  }

  eliminarEvento(idEvento){
    this._eventoService.eliminarEvento(idEvento).subscribe(
      response=>{
        console.log(response);
        this.obtenerEventos();
      }
    )
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

  obtenerHoteles() {
    this._hotelService.obtenerHoteles(this.token).subscribe(
      (response) => {
        this.hotelesModelGet = response.hotelesEncontrados;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  //Otra manera de Navegar con Parametros
  navegarDetalleEvento(idEvento) {
    this._router.navigate(['/detalleEvento', idEvento]);
  }
}

