import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Reservacion } from '../modelos/reservaciones.model';

@Injectable({
  providedIn: 'root',
})
export class ReservacionService {
  public url: String;
  public token;
  public identidad;
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  obtenerReservaciones(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerReservaciones', {
      headers: headersToken,
    });
  }

  agregarReservaciones(reservacion: Reservacion, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let params = JSON.stringify(reservacion);

    return this._http.post(this.url + '/agregarReservacion', params, {
      headers: headersToken,
    });
  }

  obtenerReservacionId(token, id: string): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerReservacionId/' + id, {
      headers: headersToken,
    });
  }

  editarReservacion(reservacion: Reservacion):Observable<any>{
    let params = JSON.stringify(reservacion);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.put(this.url + '/editarReservacionADMIN/' + reservacion._id, params, {headers: headersToken})
  }

  eliminarReservacion(id:String): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken());
    return this._http.delete(this.url + '/eliminarReservacionAdmin/' + id, {headers: headersToken})
  }

  obtenerHabitaciones(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerHabitaciones', {
      headers: headersToken,
    });
  }

  getToken(){
    var token2 = localStorage.getItem('token');
    if(token2 != 'undefined'){
      this.token = token2;
    }else{
      this.token = null;
    }

    return this.token;
  }

  getIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem('identidad'));
    if(identidad2 != 'undefined'){
      this.identidad = identidad2
    }else{
      this.identidad = null;
    }

    return this.identidad;
  }


}

