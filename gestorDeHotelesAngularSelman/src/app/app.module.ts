import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { DetalleServicioComponent } from './componentes/detalle-servicio/detalle-servicio.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    UsuariosComponent,
    ServiciosComponent,
    DetalleServicioComponent,
    HotelComponent,
    DetalleHotelComponent,
    DetalleMiPerfilComponent,
    InicioComponent,
    TipoEventoComponent,
    DetalleTipoEventoComponent,
    EventoComponent,
    DetalleTablaEventoComponent,
    HabitacionComponent,
    DetalleTablaHabitacionComponent,
    ReservacionComponent,
    DetalleTablaReservacionComponent,
    DetalleTablaHotelComponent,
    DetalleTablaServicioComponent,
    DetalleTablaTipoEventoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
