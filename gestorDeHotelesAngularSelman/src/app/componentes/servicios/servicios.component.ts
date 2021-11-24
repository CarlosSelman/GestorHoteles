import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio } from 'src/app/modelos/servicios.model';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuestas',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
  providers: [ServicioService, UsuarioService],
})
export class ServiciosComponent implements OnInit {
  public token;
  public serviciosModelGet: Servicio;
  public serviciosModelAdd: Servicio;
  public serviciosModelGetId: Servicio;

  constructor(

    public _servicioService: ServicioService,
    public _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.token = this._usuarioService.getToken();
    this.serviciosModelGetId = new Servicio(
      '',
      '',
      '',
      0,
      '',
      ''
    );
    this.serviciosModelAdd = new Servicio(
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

  agregarServicios() {

    if(this.serviciosModelAdd.nombre===""||this.serviciosModelAdd.descripcion===""||this.serviciosModelAdd.monto===null){
      Swal.fire({
        /*position: 'top',*/
        icon: 'warning',
        title: 'Llene todos los campos',
        showConfirmButton: false,
        timer: 1500,
      });
    }else{

      this._servicioService.agregarServicios(this.serviciosModelAdd, this.token).subscribe(
      response=>{
        this.serviciosModelAdd.nombre = '';
        this.serviciosModelAdd.descripcion ='';
        this.serviciosModelAdd.monto =null;
        this.serviciosModelAdd.imagen ='';
        console.log(response);

        Swal.fire({
          /*position: 'top',*/
          icon: 'success',
          title: 'Servicio registrado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });

        this.obtenerServicios()
      }
    );
    }
  }

  editarServicio(){

      if(this.serviciosModelGetId.nombre===""||this.serviciosModelGetId.descripcion===""||this.serviciosModelGetId.monto===null){

        Swal.fire({
          /*position: 'top',*/
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
      }else{

      this._servicioService.editarServicio(this.serviciosModelGetId).subscribe(
        response=>{
          console.log(response);

          Swal.fire({
            /*position: 'top',*/
            icon: 'success',
            title: 'Servicio registrado correctamente',
            showConfirmButton: false,
            timer: 1500,
          });

          this.obtenerServicios();
        }
      )
    }
  }

  eliminarServicio(idServicio){
    this._servicioService.eliminarServicio(idServicio).subscribe(
      response=>{
        console.log(response);
        this.obtenerServicios();
      }
    )
  }

  //Otra manera de Navegar con Parametros
  navegarDetalleServicio(idServicio) {
    this._router.navigate(['/detalleServicio', idServicio]);
  }
}

