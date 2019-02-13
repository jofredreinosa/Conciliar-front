import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  constructor(private http: Http) { }

  crearTransaccionLibros(values: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/v1/tranlibr',values);
  }
  
}
