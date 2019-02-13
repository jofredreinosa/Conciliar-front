import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Tipotransaccion } from '../Models/Tipotransaccion';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class TipotransService {

  constructor(private http: Http) { }

  public getTiposDeTransacciones(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/tipotrans`).map((response: Response) => response.json());
  }

  public getTipoDeTransaccion(id : string): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/tipotran`+'/'+id).map((response: Response) => response.json());
  }

 
}
