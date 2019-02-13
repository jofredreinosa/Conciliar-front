import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CuentaBancaria } from '../Models/cuenta-bancaria';
import { CuenbancsService } from '../Services/cuenbancs.service';

import 'rxjs/add/operator/map';

// declare var $:    any;
declare var swal: any;

@Component({
    selector: 'app-cuen-banc',
    templateUrl: './cuen-banc.component.html',
    styleUrls: ['./cuen-banc.component.css']
})
export class CuenBancComponent implements OnInit{
    public tabla: any;
    public filas_marcadas = [];

    constructor(
        private router: Router,
    ) {}

    ngOnInit() {
        this.initDatatable();
    }
    private initDatatable(): void {
        let that = this;
        let rows_checked = [];
        that.tabla = $('#example').DataTable({
            pagingType: 'simple_numbers',
            lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
            responsive: true,
            processing: true,
            serverSide: true,
            language: environment.DATATABLES_LANGUAGE,
            ajax: {
                url: `http://127.0.0.1:8000/api/v1/cuenbancs`,
                // data: function (d) {
                //     d.buscar = $('#datatables_filter input').val();
                //     d.columnaOrden = d.columns[d.order[0]['column']]['name'];
                //     d.ordenDireccion = d.order[0]['dir'];
                // },
                dataFilter: function (data) {
                    let json = JSON.parse(data);
                    json.draw = json.vista;
                    json.recordsTotal = json.total;
                    json.recordsFiltered = json.filtrados;
                    return JSON.stringify(json); // return JSON string
                },
            },
            columns: [
                { 'data': 'id_cuenbanc' },
                { 'data': 'tx_desccuenbanc' },
                { 'data': 'tx_numecuenbanc' },
                { 'data': 'tx_tipocuenbanc' },
                { 'data': '', orderable: false }
            ],
            columnDefs: [ {
                  targets: 0,
                  className: 'dt-head-center dt-body-center'
              },
              {
                    targets: 2,
                    className: 'dt-head-center dt-body-center'
              },
              {
                    targets: 3,
                    className: 'dt-head-center dt-body-center'
              },
              {
                targets: 4,
                render: function (data, type, row, meta) {
                    let rtn = '';
                    rtn = rtn + '<a class="btn btn-xs btn-primary"><i class="fas fa-edit"></i></a>&nbsp';
                    rtn = rtn + '<a class="btn btn-xs btn-danger"><i class="fas fa-trash-alt"></i></a>';
                    return rtn;
                },
                className: 'dt-head-center dt-body-center'
            }]
        });

        // Acción sobre botón de edición de registro
       $('#example tbody').on('click', '.btn-primary', function () {
           let data = that.tabla.row($(this).parents('tr')).data();
           that.router.navigate(['/editar-cuenbanc/', data.id_cuenbanc]);
       });

    }
}
