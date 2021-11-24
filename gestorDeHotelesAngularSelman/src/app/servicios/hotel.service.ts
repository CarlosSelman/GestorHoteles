import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Hotel } from '../modelos/hoteles.model';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
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

  agregarHoteles(hotel: Hotel, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let params = JSON.stringify(hotel);

    return this._http.post(this.url + '/agregarHotel', params, {
      headers: headersToken,
    });
  }


  obtenerHotelId(token, id: string): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerHotelId/' + id, {
      headers: headersToken,
    });
  }

  editarHotel(hotel: Hotel):Observable<any>{
    let params = JSON.stringify(hotel);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.put(this.url + '/editarHotelADMIN/' + hotel._id, params, {headers: headersToken})
  }

  eliminarHotel(id:String): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken());
    return this._http.delete(this.url + '/eliminarHotelAdmin/' + id, {headers: headersToken})
  }


  agregarHabitacion(token, modeloComentario): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let params = JSON.stringify(modeloComentario);

    return this._http.put(
      this.url + '/agregarHabitacion/' + modeloComentario.idHotel,
      params,
      { headers: headersToken }
    );
  }


  editarHabitacion(hotel):Observable<any>{
    let params = JSON.stringify(hotel);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.put(this.url + '/editarHabitacion/' + hotel._id, params, {headers: headersToken})
  }

  eliminarHabitacion(id:String): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken());
    return this._http.delete(this.url + '/eliminarHabitacion/' + id, {headers: headersToken})
  }

  obtenerHabitacion(token, id: string): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerHabitacion/' + id, {
      headers: headersToken,
    });
  }


  obtenerUsuarios(): Observable<any>{
    return this._http.get(this.url + '/obtenerUsuarios', {headers: this.headersVariable});
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
