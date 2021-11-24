
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Hotel } from 'src/app/modelos/hoteles.model';
import { HotelService } from 'src/app/servicios/hotel.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-tabla-hotel',
  templateUrl: './detalle-tabla-hotel.component.html',
  styleUrls: ['./detalle-tabla-hotel.component.scss'],
  providers: [UsuarioService,HotelService],
})
export class DetalleTablaHotelComponent implements OnInit {
  public token;
  public hoteles;
  public usuarios;
  public idHotelModel: Hotel;
  public hotelesModelGet: Hotel;
  public hotelesModelAdd: Hotel;
  public hotelesModelGetId: Hotel;
  constructor(

    public _usuarioService: UsuarioService,
    public _hotelService: HotelService,
    private _router: Router
  ) {
    this.token = this._usuarioService.getToken();
    this.idHotelModel = new Hotel(
      '',
      '',
      '',
      '',
      '',
      '',
      { si: 0, no: 0, ninguna: 0, usuarioEncuestados: [] },
      [{ nombre: '', descripcion: '',monto: 0, imagen: '',idUsuarioCreador: '' }],
      ''
    );
   }

   ngOnInit(): void {
    this.obtenerHoteles();

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

  obtenerHotel(idHotel){
    this._hotelService.obtenerHotelId(this.token, idHotel).subscribe(
      response => {
        this.hotelesModelGetId =response.hotelEncontrado;
        console.log(response);
      }
    )
  }

  agregarHoteles() {

    if(
      this.hotelesModelAdd.nombre===""||
      this.hotelesModelAdd.descripcion===""||
      this.hotelesModelAdd.direccion===""||
      this.hotelesModelAdd.administradorHotel===""
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

      this._hotelService.agregarHoteles(this.hotelesModelAdd, this.token).subscribe(
      response=>{

        this.hotelesModelAdd.nombre = '';
        this.hotelesModelAdd.descripcion ='';
        this.hotelesModelAdd.direccion = '';
        this.hotelesModelAdd.administradorHotel ='';
        this.hotelesModelAdd.imagen ='';

        console.log(response);

        Swal.fire({
          /*position: 'top',*/
          icon: 'success',
          title: 'Hotel agregado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });

        this.obtenerHoteles()
      }
    );
    }
  }

  editarHotel(){
      if(
        this.hotelesModelGetId.nombre===""||
        this.hotelesModelGetId.descripcion===""||
        this.hotelesModelGetId.direccion===""
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

    this._hotelService.editarHotel(this.hotelesModelGetId).subscribe(
      response=>{
        console.log(response);

        Swal.fire({
          /*position: 'top',*/
          icon: 'success',
          title: 'Hotel editado y actualizado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });

        this.obtenerHoteles();
      }
    )
  }
}

  eliminarHotel(idHotel){
    this._hotelService.eliminarHotel(idHotel).subscribe(
      response=>{
        console.log(response);
        this.obtenerHoteles();
      }
    )
  }
/*

  agregarHabitacion(){
    this.modeloComentario.idHotel = String(this.hotelesModelGetId._id);
    this._hotelService.agregarHabitacion(this.token, this.modeloComentario).subscribe(
      response=>{
        console.log(response);

      }
    )
  }

  eliminarHabitacion(idHabitacion){
    this._hotelService.eliminarHabitacion(idHabitacion).subscribe(
      response=>{
        console.log(response);
        this.obtenerHoteles();
      }
    )
  }

  editarHabitacion(){
    this._hotelService.editarHabitacion(this.hotelesModelGetId).subscribe(
      response=>{
        console.log(response);
        this.obtenerHoteles();
      }
    )
  }

  obtenerHabitacion(idHabitacion){
    this._hotelService.obtenerHabitacion(this.token,idHabitacion).subscribe(
      response => {
        this.hotelesModelGetId =response.habitacionEncontrada;
        console.log(response);
      }
    )
  }
*/
  obtenerUsuarios(){
    this._usuarioService.obtenerUsuarios().subscribe(
      response => {
        this.usuarios = response.usuariosEncontrados;
        console.log(response)
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  //Otra manera de Navegar con Parametros
  navegarDetalleHotel(idHotel) {
    this._router.navigate(['/detalleHotel', idHotel]);
  }

}


