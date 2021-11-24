import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Habitacion } from '../modelos/habitaciones.model';

@Injectable({
  providedIn: 'root',
})
export class HabitacionService {
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

  obtenerHoteles(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerHoteles', {
      headers: headersToken,
    });
  }

  agregarHabitaciones(habitacion: Habitacion, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let params = JSON.stringify(habitacion);

    return this._http.post(this.url + '/agregarHabitacion', params, {
      headers: headersToken,
    });
  }

  obtenerHabitacionId(token, id: string): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerHabitacionId/' + id, {
      headers: headersToken,
    });
  }

  editarHabitacion(habitacion: Habitacion):Observable<any>{
    let params = JSON.stringify(habitacion);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.put(this.url + '/editarHabitacionADMIN/' + habitacion._id, params, {headers: headersToken})
  }

  eliminarHabitacion(id:String): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken());
    return this._http.delete(this.url + '/eliminarHabitacionAdmin/' + id, {headers: headersToken})
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
