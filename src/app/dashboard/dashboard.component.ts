import { Component, OnInit } from '@angular/core';

export interface operaciones {
    microserv: string;
    proceso: number;
    reciente: string;
    antiguo: string;
    ultimo: string;
}

const DATOS: operaciones[] = [
    { microserv: 'Parser (parser)', proceso: 89 , reciente: '0:00:01' ,  antiguo: '0:00:05'  , ultimo: '' },
    { microserv: 'Firma (firma)', proceso: 567 , reciente: '0:00:01' ,  antiguo: '0:00:05' , ultimo: '' },
    { microserv: 'Data Output Web Service do', proceso: 13 , reciente: '0:00:01' ,  antiguo: '0:00:05' , ultimo: '0:10:54' },
    { microserv: 'Consultar Resultado Transacciones (crt)', proceso: 133 , reciente: '0:00:01' ,  antiguo: '' , ultimo: '' },
    { microserv: 'Data Output Notificacion (do)', proceso: 13 , reciente: '0:00:01' ,  antiguo: '0:00:05'  , ultimo: '' },

];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['microserv', 'proceso', 'reciente', 'antiguo', 'ultimo'];
    dataSource = DATOS;

  ngOnInit() {
  }

}
