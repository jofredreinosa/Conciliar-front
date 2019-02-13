import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {ModaltranbancComponent} from '../modaltranbanc/modaltranbanc.component';
import { TipotransService } from '../Services/tipotrans.service';
import { TransaccionesService } from '../Services/transacciones.service';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-creartranlibr',
  templateUrl: './creartranlibr.component.html',
  styleUrls: ['./creartranlibr.component.css']
})
export class CreartranlibrComponent implements OnInit {

  @ViewChild(ModaltranbancComponent)
  private modalTranbanc: ModaltranbancComponent;
  public loading: boolean = false;
  public formTrLibros: FormGroup;

  constructor(  private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private tipoTranService: TipotransService,
    private transaccionesService: TransaccionesService)
  {
    this.formTrLibros = fb.group({
      idtipotran: [''],
      tipotran: ['' , Validators.required],
      desctran: [''],
      numetran: ['' , Validators.required],
      fechatran: ['' , Validators.required],
      monttran: ['' , Validators.required],
      obsertran: [''],
    })
  }

  ngOnInit() {
  }

    public buscarTipoTran(campo: string, valor: string = null)  {
      let elementToFocus = document.getElementById("numetran")
      this.modalTranbanc.openModal(valor, elementToFocus);
    }

    onTranBancSelected(data: any) {
        this.formTrLibros.controls['idtipotran'].setValue(data.id_tipotran);
        this.formTrLibros.controls['tipotran'].setValue(data.tx_coditipotran);
        this.formTrLibros.controls['desctran'].setValue(data.tx_desctipotran);
    }

    limpiarForm() {
      this.formTrLibros.reset();
      $( '#tipotran' ).focus();
    }

    validarTipoTran(id: string){
      this.loading = true;
      if(id.length>0) {
        id = id.toUpperCase();
        this.tipoTranService.getTipoDeTransaccion(id).subscribe((success: any) => {
            if (success.message!='OK') {
                this.loading = false;
                swal({
                      title: "Error",
                      text: success.message,
                      type: "error",
                    })
                    .then((value) => {
                      if (value) {
                        this.formTrLibros.controls['tipotran'].setValue('');
                        this.formTrLibros.controls['desctran'].setValue('');
                        $('#tipotran').focus();
                      } 
                    });
            }
            else {
              let data = success.data[0];
              this.formTrLibros.controls['idtipotran'].setValue(data.id_tipotran);
              this.formTrLibros.controls['tipotran'].setValue(data.tx_coditipotran);
              this.formTrLibros.controls['desctran'].setValue(data.tx_desctipotran);
              this.loading = false;
            }
        }, error => {
            this.loading = false;
            this.mostrarAlerta("Se generó un error al realizar la búsqueda");
        });
      }
    }

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

   enviarDatos() {
     this.loading = true;
      const CB = this.formTrLibros;
      let trLibros = {
        'id_cuenbanc' : 1,
        'id_tipotran' : CB.controls.idtipotran.value,
        'tx_numetran' : CB.controls.numetran.value,
        'fe_fechtran' : CB.controls.fechatran.value,
        'nu_monttran' : CB.controls.monttran.value,
      };
      this.transaccionesService.crearTransaccionLibros(trLibros).subscribe(response => {
            this.loading = false;
            if (response){
              swal({
                type: 'success',
                title: 'Crear Transacciones de Libros',
                text: 'La transacción bancaria fue creada con éxito',
                footer: ''
              }).then((result) => {
                  if (result.value) {
                    this.limpiarForm();
                  }
                });
            }
            else {
              swal({
                type: 'error',
                title: 'Crear Cuenta',
                text: response.message,
                footer: ''
              });
            }
          },
          error => {
            this.loading = false;
            swal({
              type: 'error',
              title: 'Oops...',
              text: 'Algo salió mal ',
              footer: ''+error
            });
          }
      );
    }
  }

