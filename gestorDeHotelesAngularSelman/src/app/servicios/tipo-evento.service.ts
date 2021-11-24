import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { TipoEvento } from '../modelos/tipoEvento.model';

@Injectable({
  providedIn: 'root'
})
export class TipoEventoService {
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

  obtenerTiposEventos(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerTiposEventos', {
      headers: headersToken,
    });
  }

  agregarTipoEvento(tipoEvento: TipoEvento, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let params = JSON.stringify(tipoEvento);

    return this._http.post(this.url + '/agregarTipoEvento', params, {
      headers: headersToken,
    });
  }

  obtenerTipoEventoId(token, id: string): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerTipoEventoId/' + id, {
      headers: headersToken,
    });
  }

  editarTipoEvento(tipoEvento: TipoEvento):Observable<any>{
    let params = JSON.stringify(tipoEvento);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.put(this.url + '/editarTipoEventoADMIN/' + tipoEvento._id, params, {headers: headersToken})
  }

  eliminarTipoEvento(id:String): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken());
    return this._http.delete(this.url + '/eliminarTipoEventoAdmin/' + id, {headers: headersToken})
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
