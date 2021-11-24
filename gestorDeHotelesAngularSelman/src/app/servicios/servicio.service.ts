import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Servicio } from '../modelos/servicios.model';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
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

  obtenerServicios(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerServicios', {
      headers: headersToken,
    });
  }

  agregarServicios(servicio: Servicio, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let params = JSON.stringify(servicio);

    return this._http.post(this.url + '/agregarServicio', params, {
      headers: headersToken,
    });
  }

  obtenerServicioId(token, id: string): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerServicioId/' + id, {
      headers: headersToken,
    });
  }

  editarServicio(servicio: Servicio):Observable<any>{
    let params = JSON.stringify(servicio);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.put(this.url + '/editarServicioADMIN/' + servicio._id, params, {headers: headersToken})
  }

  eliminarServicio(id:String): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken());
    return this._http.delete(this.url + '/eliminarServicioAdmin/' + id, {headers: headersToken})
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
