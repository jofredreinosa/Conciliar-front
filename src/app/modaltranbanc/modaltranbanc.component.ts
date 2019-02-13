import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { environment } from '../../environments/environment';
import { TipotransService } from '../Services/tipotrans.service';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-modaltranbanc',
  templateUrl: './modaltranbanc.component.html',
  styleUrls: ['./modaltranbanc.component.css']
})
export class ModaltranbancComponent implements OnInit {
  public tabla: any;
  public tipoTrans: Array<any> = [];
  public elementToFocus: any;

  constructor(private tipoTranService: TipotransService) { }

  @Output() onTranBancSelected = new EventEmitter<any>();

  ngOnInit() {
    this.initDatatable();
  }

  private initDatatable(): void {
      let that = this;
      let rows_checked = [];
      that.tabla = $('#tipotrans').DataTable({
          sDom: 'rt<"bottom"ip><"clear">',
          lengthMenu: [[5], [5]],
          pagingType: 'simple_numbers',
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
              { 'data': '', orderable: false }
          ],
              columnDefs: [ {
                    targets: 0,
                    className: 'dt-head-center dt-body-center'
                },
            {
              targets: 3,
              render: function (data, type, row, meta) {
                  let rtn = '';
                  rtn = rtn + '<a class="btn btn-xs btn-success"><i class="fas fa-check"></i></a>&nbsp';
                  return rtn;
              },
               className: 'dt-head-center dt-body-center'
          }]
      });



     $('#tipotrans tbody').on('click', '.btn-success', function () {
         let data = that.tabla.row($(this).parents('tr')).data();
         that.asignarTipoTran(data);
     });
  }

  public openModal(valor: string = null, elementToFocus: any): Promise<any> {
        this.tipoTrans = [];
        this.elementToFocus = elementToFocus;
        return new Promise((resolve, reject) => {
            this.tipoTranService.getTiposDeTransacciones().subscribe((success: any) => {
                let data = success.data;
                if (data.length === 0) {
                    this.mostrarAlerta("No se encontraron coincidencias");
                } else  {
                    this.tipoTrans = data;
                    if(valor.length > 0) {
                        this.filtrar(valor);
                    }
                    else{
                      this.filtrar('');
                    }

                    $('#modalTranbanc').modal('show');
                }
                resolve(data);
            }, error => {
                this.mostrarAlerta("Se generó un error al realizar la búsqueda");
                reject();
            });
        });
    }

    public filtrar(cadena: string) {

      this.tabla.search( cadena ).draw();
    }

    public asignarTipoTran(data: any) {
        this.onTranBancSelected.emit(data);
        $('#modalTranbanc').modal('toggle');
        this.elementToFocus.focus();
    }

    /**
    * mostrarAlerta
    * @param {string} mensaje
    */
   private mostrarAlerta = (mensaje: string) => {
       swal({
           html: `<h5>${mensaje}</h5>`,
           type: 'error',
           showConfirmButton: false,
           showCancelButton: true,
           cancelButtonClass: 'btn btn-danger',
           cancelButtonText: 'Cerrar',
           buttonsStyling: false
       }).catch(swal.noop);
   }
}
