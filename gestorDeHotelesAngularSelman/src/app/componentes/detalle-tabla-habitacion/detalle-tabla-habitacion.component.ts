
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Habitacion } from 'src/app/modelos/habitaciones.model';
import { HabitacionService } from 'src/app/servicios/habitacion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Hotel } from 'src/app/modelos/hoteles.model';
import { HotelService } from 'src/app/servicios/hotel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-tabla-habitacion',
  templateUrl: './detalle-tabla-habitacion.component.html',
  styleUrls: ['./detalle-tabla-habitacion.component.scss'],
  providers: [HabitacionService, UsuarioService,HotelService],
})
export class DetalleTablaHabitacionComponent implements OnInit {
  public token;
  public habitaciones;
  public idHabitacionModel: Habitacion;
  public habitacionesModelGet: Habitacion;
  public hotelesModelGet:Hotel;
  public habitacionesModelAdd: Habitacion;
  public habitacionesModelGetId: Habitacion;
  constructor(
    public _habitacionService: HabitacionService,
    public _usuarioService: UsuarioService,
    public _hotelService: HotelService,
    private _router: Router
  ) {
    this.token = this._usuarioService.getToken();
    this.idHabitacionModel = new Habitacion(
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
    this.obtenerHabitaciones();
    //this.obtenerHoteles();
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

  obtenerHabitacion(idHabitacion){
    this._habitacionService.obtenerHabitacionId(this.token, idHabitacion).subscribe(
      response => {
        this.habitacionesModelGetId =response.habitacionEncontrada;
        console.log(response);
      }
    )
  }

  agregarHabitacion() {

    if(
      this.habitacionesModelAdd.nombre===""||
      this.habitacionesModelAdd.descripcion===""||
      this.habitacionesModelAdd.idHotel===""||
      this.habitacionesModelAdd.monto===null
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

      this._habitacionService.agregarHabitaciones(this.habitacionesModelAdd, this.token).subscribe(
      response=>{

        this.habitacionesModelAdd.nombre = '';
        this.habitacionesModelAdd.descripcion ='';
        this.habitacionesModelAdd.idHotel ='';
        this.habitacionesModelAdd.monto =null;
        this.habitacionesModelAdd.imagen ='';
        console.log(response);

        Swal.fire({
          /*position: 'top',*/
          icon: 'success',
          title: 'Habitaci??n registrada correctamente',
          showConfirmButton: false,
          timer: 1500,
        });

        this.obtenerHabitaciones()
      }
    );
    }
  }

  editarHabitacion(){

      if(
        this.habitacionesModelGetId.nombre===""||
        this.habitacionesModelGetId.descripcion===""||
        this.habitacionesModelGetId.monto===null
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

      this._habitacionService.editarHabitacion(this.habitacionesModelGetId).subscribe(
        response=>{
          console.log(response);

          Swal.fire({
            /*position: 'top',*/
            icon: 'success',
            title: 'Habitaci??n editada y actualzada correctamente',
            showConfirmButton: false,
            timer: 1500,
          });

          this.obtenerHabitaciones();
        }
      )
    }
  }

  eliminarHabitacion(idHabitacion){
    this._habitacionService.eliminarHabitacion(idHabitacion).subscribe(
      response=>{
        console.log(response);
        this.obtenerHabitaciones();
      }
    )
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


}



