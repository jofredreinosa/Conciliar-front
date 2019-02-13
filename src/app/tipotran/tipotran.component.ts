import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Tipotransaccion } from '../Models/tipotransaccion';
import { Observable } from 'rxjs/Observable';
import { TipotransService } from '../Services/tipotrans.service';

declare var $:    any;
declare var swal: any;

@Component({
    selector: 'app-tipotran',
    templateUrl: './tipotran.component.html',
    styleUrls: ['./tipotran.component.css']
})
export class TipotranComponent implements OnInit {

    public tabla: any;
    public tipotrans: Array<any> = [];


    constructor(private tipstraService: TipotransService) { }

    ngOnInit() {
        this.initDatatable();


    }
    private initDatatable(): void {
        let that = this;
        let rows_checked = [];
        that.tabla = $('#tipotrans').DataTable({
            pagingType: 'simple_numbers',
            lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
            responsive: true,
            language: environment.DATATABLES_LANGUAGE,
            ajax: {
               url: "http://127.0.0.1:8000/api/v1/tipotrans",
               type: "GET"
             },
            columns: [
                { 'data': 'id_tipotran' },
                { 'data': 'tx_coditipotran' },
                { 'data': 'tx_desctipotran' },
                { 'data': 'tx_sumaoresta' },
                { 'data': '', orderable: false }
            ],
            columnDefs: [ {
                  targets: 0,
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

        $('#example tbody').on('click', '.btn-primary', function () {
            let data = that.tabla.row($(this).parents('tr')).data();
            alert('Hello world! ' + data);
        });
    }

  
}
