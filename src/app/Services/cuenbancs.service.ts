import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CuentaBancaria} from '../Models/cuenta-bancaria';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class CuenbancsService {


  constructor(private http: HttpClient) {

  }
  getCuentasBancarias() {
    return this.http.get('http://127.0.0.1:8000/api/v1/cuentas-bancarias');
  }

  // getCuentaBancaria(id_cuenbanc: any): Observable<any> {
  //      return this.http.get(
  //          `http://127.0.0.1:8000/api/v1/cuenbancs/${id_cuenbanc}`)
  //          .map((response: Response) => response.json());
  //  }

   getCuentaBancaria(id_cuenbanc: any): Observable<any> {
       return this.http.get(
           `http://127.0.0.1:8000/api/v1/cuenbancs/${id_cuenbanc}`);
   }

   crearCuentaBancaria(values: any): Observable<any> {
        return this.http.post(`http://127.0.0.1:8000/api/v1/cuenbancs/`,values);
    }

    actualizarCuentaBancaria(values: any, id_cuenbanc: number): Observable<any> {
        return this.http.put(`http://127.0.0.1:8000/api/v1/cuenbancs/${id_cuenbanc}`,values);
    }


    private parseObject(object: any) {
        return Object.keys(object).map(
            k => `${encodeURIComponent(k)}=${(typeof object[k] === 'object' ? JSON.stringify(object[k]) : encodeURIComponent(object[k]))}`
        ).join('&');
    }
}
