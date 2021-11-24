import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleServicioComponent } from './componentes/detalle-servicio/detalle-servicio.component';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { HotelComponent } from './componentes/hotel/hotel.component';
import { DetalleHotelComponent } from './componentes/detalle-hotel/detalle-hotel.component';
import { DetalleMiPerfilComponent } from './componentes/detalle-mi-perfil/detalle-mi-perfil.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { TipoEventoComponent } from './componentes/tipo-evento/tipo-evento.component';
import { DetalleTipoEventoComponent } from './componentes/detalle-tipo-evento/detalle-tipo-evento.component';
import { EventoComponent } from './componentes/evento/evento.component';
import { DetalleTablaEventoComponent } from './componentes/detalle-tabla-evento/detalle-tabla-evento.component';
import { HabitacionComponent } from './componentes/habitacion/habitacion.component';
import { DetalleTablaHabitacionComponent } from './componentes/detalle-tabla-habitacion/detalle-tabla-habitacion.component';
import { ReservacionComponent } from './componentes/reservacion/reservacion.component';
import { DetalleTablaReservacionComponent } from './componentes/detalle-tabla-reservacion/detalle-tabla-reservacion.component';
import { DetalleTablaHotelComponent } from './componentes/detalle-tabla-hotel/detalle-tabla-hotel.component';
import { DetalleTablaServicioComponent } from './componentes/detalle-tabla-servicio/detalle-tabla-servicio.component';
import { DetalleTablaTipoEventoComponent } from './componentes/detalle-tabla-tipo-evento/detalle-tabla-tipo-evento.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'habitaciones', component: HabitacionComponent },
  { path: 'reservaciones', component: ReservacionComponent },
  { path: 'tipoEvento', component: TipoEventoComponent },
  { path: 'hoteles', component: HotelComponent},
  { path: 'eventos', component: EventoComponent},
  { path: 'detalleTablaReservaciones', component: DetalleTablaReservacionComponent},
  { path: 'detalleTablaHotel', component: DetalleTablaHotelComponent},
  { path: 'detalleTablaServicio', component: DetalleTablaServicioComponent},
  { path: 'detalleTablaTipoEvento', component: DetalleTablaTipoEventoComponent},
  { path: 'detalleTipoEvento/:idTipoEvento', component: DetalleTipoEventoComponent},
  { path: 'detalleTablaEventos', component: DetalleTablaEventoComponent},
  { path: 'detalleTablaHabitaciones', component: DetalleTablaHabitacionComponent},
  { path: 'detalleServicio/:idServicio', component: DetalleServicioComponent },
  { path: 'detalleMiPerfil', component: DetalleMiPerfilComponent },
  { path: 'detalleHotel/:idHotel', component: DetalleHotelComponent},
  { path: '**', component: LoginComponent }
  // { path: '**', redictTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
