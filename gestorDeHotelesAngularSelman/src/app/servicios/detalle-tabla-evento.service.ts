  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { GLOBAL } from './global.service';
  import { Observable } from 'rxjs';
  import { Evento } from '../modelos/eventos.model';

  @Injectable({
    providedIn: 'root',
  })
  export class DetalleTablaEventoService {
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

    obtenerEventos(token): Observable<any> {
      let headersToken = this.headersVariable.set('Authorization', token);

      return this._http.get(this.url + '/obtenerEventos', {
        headers: headersToken,
      });
    }

    agregarEventos(evento: Evento, token): Observable<any> {
      let headersToken = this.headersVariable.set('Authorization', token);
      let params = JSON.stringify(evento);

      return this._http.post(this.url + '/agregarEvento', params, {
        headers: headersToken,
      });
    }

    obtenerEventoId(token, id: string): Observable<any> {
      let headersToken = this.headersVariable.set('Authorization', token);

      return this._http.get(this.url + '/obtenerEventoId/' + id, {
        headers: headersToken,
      });
    }

    editarEvento(evento: Evento):Observable<any>{
      let params = JSON.stringify(evento);
      let headersToken = this.headersVariable.set('Authorization', this.getToken())

      return this._http.put(this.url + '/editarEventoADMIN/' + evento._id, params, {headers: headersToken})
    }

    eliminarEvento(id:String): Observable<any>{
      let headersToken = this.headersVariable.set('Authorization', this.getToken());
      return this._http.delete(this.url + '/eliminarEventoAdmin/' + id, {headers: headersToken})
    }

    obtenerTiposEventos(token): Observable<any> {
      let headersToken = this.headersVariable.set('Authorization', token);

      return this._http.get(this.url + '/obtenerTiposEventos', {
        headers: headersToken,
      });
    }

    obtenerHoteles(token): Observable<any> {
      let headersToken = this.headersVariable.set('Authorization', token);

      return this._http.get(this.url + '/obtenerHoteles', {
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
