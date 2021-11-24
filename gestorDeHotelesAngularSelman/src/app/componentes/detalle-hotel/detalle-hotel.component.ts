import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/modelos/hoteles.model';
import { HotelService } from 'src/app/servicios/hotel.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-detalle-hotel',
  templateUrl: './detalle-hotel.component.html',
  styleUrls: ['./detalle-hotel.component.scss'],
  providers: [UsuarioService, HotelService],
})
export class DetalleHotelComponent implements OnInit {

  public token;
  public hotelesModelGet: Hotel;
  public hotelesModelAdd: Hotel;
  public hotelesModelGetId: Hotel;

  public habitacionEspecifico = {
    _id: '',
    nombre: '',
    descripcion: '',
    monto: '',
    imagen: '',
    idUsuarioCreador: ''
  }

  public modeloComentario = {
    idHotel: '',
    nombre: '',
    descripcion: '',
    monto: '',
    imagen: ''
  }

  public hotelModel;
  public idHotelRuta: string;
  constructor(
    public _usuarioService: UsuarioService,
    public _hotelService: HotelService,
    public _activatedRoute: ActivatedRoute
  ) {
    this.token = this._usuarioService.getToken();
    this.hotelesModelGetId = new Hotel(
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
    this.hotelModel = new Hotel(
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
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idHotelRuta = dataRuta.get('idHotel');
    });
    this.obtenerHotelId(this.idHotelRuta);
  }

  obtenerHoteles() {
    this._hotelService.obtenerHoteles(this.token).subscribe(
      (response) => {
        this.hotelesModelGet = new Hotel(
        '',
        '',
        '',
        '',
        '',
        '',
        { si: 0, no: 0, ninguna: 0, usuarioEncuestados: [] },
        [{ nombre: '', descripcion: '',monto: 0, imagen: '',idUsuarioCreador: '' }],
        '')
        this.hotelesModelGet = response.hotelesEncontrados;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  obtenerHotelId(idHotel) {
    this._hotelService
      .obtenerHotelId(this.token, idHotel)
      .subscribe((response) => {
        this.hotelModel = response.hotelEncontrado;
        console.log(response);
      });
  }


  eliminarHabitacion(idHabitacion){
    this._hotelService.eliminarHabitacion(idHabitacion).subscribe(
      response=>{
        console.log(response);
        this.obtenerHotelId(this.idHotelRuta);

      }
    )
  }

  editarHabitacion(){
    this._hotelService.editarHabitacion(this.habitacionEspecifico).subscribe(
      response=>{
        console.log(response);
        this.obtenerHoteles();
      }
    )
  }

  obtenerHabitacion(idHabitacion){
    this._hotelService.obtenerHabitacion(this.token, idHabitacion).subscribe(
      response => {
        this.hotelesModelGetId =response.habitacionEncontrada;
        console.log(response);
      }
    )
  }

  obtenerHabitacionEspecifica(datosHabitacion){
    console.log(datosHabitacion);
    this.habitacionEspecifico = datosHabitacion;
    this._hotelService.obtenerHabitacion(this.token, this.habitacionEspecifico._id).subscribe(
      response => {
        this.hotelesModelGetId =response.habitacionEncontrada;
        console.log(response);
      }
    )
  }
}
