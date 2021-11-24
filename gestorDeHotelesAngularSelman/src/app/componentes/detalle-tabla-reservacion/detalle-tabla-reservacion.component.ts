

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservacion } from 'src/app/modelos/reservaciones.model';
import { ReservacionService } from 'src/app/servicios/reservacion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Habitacion } from 'src/app/modelos/habitaciones.model';
import { HabitacionService } from 'src/app/servicios/habitacion.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-tabla-reservacion',
  templateUrl: './detalle-tabla-reservacion.component.html',
  styleUrls: ['./detalle-tabla-reservacion.component.scss'],
  providers: [ReservacionService, UsuarioService,HabitacionService],
})
export class DetalleTablaReservacionComponent implements OnInit {
  public token;
  public eventos;
  public idReservacionModel: Reservacion;
  public reservacionesModelGet: Reservacion;
  public habitacionesModelGet:Habitacion;
  public reservacionesModelAdd: Reservacion;
  public reservacionesModelGetId: Reservacion;
  constructor(
    public _reservacionService: ReservacionService,
    public _usuarioService: UsuarioService,
    public _habitacionService: HabitacionService,
    private _router: Router
  ) {
    this.token = this._usuarioService.getToken();
    this.idReservacionModel = new Reservacion(
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
    this.obtenerReservaciones();
  }

  obtenerReservaciones() {
    this._reservacionService.obtenerReservaciones(this.token).subscribe(
      (response) => {
        this.reservacionesModelGet = response.reservacionesEncontradas;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  obtenerReservacion(idReservacion){
    this._reservacionService.obtenerReservacionId(this.token, idReservacion).subscribe(
      response => {
        this.reservacionesModelGetId =response.reservacionEncontrada;
        console.log(response);
      }
    )
  }

  agregarReservaciones() {

    if(
      this.reservacionesModelAdd.nombre===""||
      this.reservacionesModelAdd.descripcion===""||
      this.reservacionesModelAdd.idHabitacion===""||
      this.reservacionesModelAdd.fechaInicio===""||
      this.reservacionesModelAdd.fechaFinal===""||
      this.reservacionesModelAdd.monto===null
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

      this._reservacionService.agregarReservaciones(this.reservacionesModelAdd, this.token).subscribe(
      response=>{

        this.reservacionesModelAdd.nombre = '';
        this.reservacionesModelAdd.descripcion ='';
        this.reservacionesModelAdd.idHabitacion ='';
        this.reservacionesModelAdd.fechaInicio = '';
        this.reservacionesModelAdd.fechaFinal ='';
        this.reservacionesModelAdd.monto =null;
        this.reservacionesModelAdd.imagen ='';

        console.log(response);

        Swal.fire({
          /*position: 'top',*/
          icon: 'success',
          title: 'Reservacion agregada correctamente',
          showConfirmButton: false,
          timer: 1500,
        });

        this.obtenerReservaciones()
      }
    );
    }
  }

  editarReservacion(){

      if(
        this.reservacionesModelGetId.nombre===""||
        this.reservacionesModelGetId.descripcion===""||
        this.reservacionesModelGetId.fechaInicio===""||
        this.reservacionesModelGetId.fechaFinal===""||
        this.reservacionesModelGetId.monto===null
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

      this._reservacionService.editarReservacion(this.reservacionesModelGetId).subscribe(
        response=>{
          console.log(response);

          Swal.fire({
            /*position: 'top',*/
            icon: 'success',
            title: 'Reservacion editada y actualzada correctamente',
            showConfirmButton: false,
            timer: 1500,
          });

          this.obtenerReservaciones();
        }
      )
    }
  }

  eliminarReservacion(idReservacion){
    this._reservacionService.eliminarReservacion(idReservacion).subscribe(
      response=>{
        console.log(response);
        this.obtenerReservaciones();
      }
    )
  }

  obtenerHabitaciones() {
    this._habitacionService.obtenerHabitaciones(this.token).subscribe(
      (response) => {
        this.habitacionesModelGet = response.habitacionesEncontradas;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  //Otra manera de Navegar con Parametros
  /*
  navegarDetalleEvento(idEvento) {
    this._router.navigate(['/detalleEvento', idEvento]);
  }
  */
}


