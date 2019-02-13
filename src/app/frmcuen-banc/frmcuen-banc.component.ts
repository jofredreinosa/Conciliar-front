import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

import { CuenbancsService } from '../Services/cuenbancs.service';

declare var $: any;
declare var swal: any;


@Component({
  selector: 'app-frmcuen-banc',
  templateUrl: './frmcuen-banc.component.html',
  styleUrls: ['./frmcuen-banc.component.css']
})
export class FrmcuenBancComponent implements OnInit {

  public formCuentas: FormGroup;
  public mostrarGuardar = true;
  public modoEdicion = false;
  public inactivo = true;

  public nu_porcimpu: AbstractControl;

  public id_cuenbanc: number = 0;
  public cuentaBancaria: any;

  /**
    * Creates an instance.
    * @param {FormBuilder} fb

  */

  constructor(
        public cuenbancService: CuenbancsService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,)
  {
    // Formulario
       this.formCuentas = fb.group({
           tx_numecuenbanc: ['', Validators.compose(
               [
                   Validators.required,
                   Validators.maxLength(20),
                   Validators.minLength(20),
               ],
           )],
           tx_desccuenbanc: ['', Validators.compose(
               [
                   Validators.required,
                   Validators.maxLength(255),
               ],
           )],
           tx_codicontcuba: ['', Validators.compose(
               [
                   Validators.required,
                   Validators.maxLength(17),
                   Validators.minLength(9),
               ],
           )],
           tx_tipocuenbanc: ['', Validators.required],
           tx_tipobanco: ['', Validators.required],
           tx_impucuenta: ['', Validators.required],
           nu_porcimpu: ['0.00', Validators.maxLength(5)],
       }),{ updateOn: 'submit' };

       this.nu_porcimpu = this.formCuentas.controls['nu_porcimpu'];

        if (this.route.snapshot.params['id_cuenbanc'] !== undefined) {
           // Se recibe como parametro por la ruta el ID
           // por lo que se consulta la información del registro
           this.cuenbancService.getCuentaBancaria(this.route.snapshot.params['id_cuenbanc'])
             .subscribe((response) => {
               this.cuentaBancaria = response;
               this.id_cuenbanc = this.cuentaBancaria.data.id_cuenbanc;
               this.asignarCuentaBancaria();
               this.modoEdicion = true;
               },
               error => {
                   swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Algo salió mal ',
                        footer: ''+error.message
                      });
               }
           );
        }
  };

  ngOnInit() {
  }

  activarImpuesto() {
    if (this.formCuentas.controls.tx_impucuenta.value == "SI") {
      this.inactivo = false;
    }
    else {
      this.inactivo = true;
      this.formCuentas.controls.nu_porcimpu.setValue(0.00);
    }
  }

  asignarCuentaBancaria() {
    const FCB = this.formCuentas;
        FCB.controls.tx_numecuenbanc.setValue(this.cuentaBancaria.data.tx_numecuenbanc);
        FCB.controls.tx_desccuenbanc.setValue(this.cuentaBancaria.data.tx_desccuenbanc);
        FCB.controls.tx_codicontcuba.setValue(this.cuentaBancaria.data.tx_codicontcuba);
        FCB.controls.tx_tipocuenbanc.setValue(this.cuentaBancaria.data.tx_tipocuenbanc);
        FCB.controls.tx_tipobanco.setValue(this.cuentaBancaria.data.tx_tipobanco);
        FCB.controls.tx_impucuenta.setValue(this.cuentaBancaria.data.tx_impucuenta);
        FCB.controls.nu_porcimpu.setValue(this.cuentaBancaria.data.nu_porcimpu);
        this.id_cuenbanc  = this.cuentaBancaria.data.id_cuenbanc;
  }

  enviarDatos() {
    if (this.route.snapshot.params['id_cuenbanc'] === undefined) {
      const CB = this.formCuentas;
      let cueBanc = {
        'tx_numecuenbanc' : CB.controls.tx_numecuenbanc.value,
        'tx_desccuenbanc' : CB.controls.tx_desccuenbanc.value,
        'tx_codicontcuba' : CB.controls.tx_codicontcuba.value,
        'tx_tipocuenbanc' : CB.controls.tx_tipocuenbanc.value,
        'tx_tipobanco'    : CB.controls.tx_tipobanco.value,
        'tx_impucuenta'   : CB.controls.tx_impucuenta.value,
        'nu_porcimpu'     : CB.controls.nu_porcimpu.value,
      };
      this.cuenbancService.crearCuentaBancaria(cueBanc).subscribe((response: Observable<any>) => {
            if (response){
              swal({
                type: 'success',
                title: 'Crear Cuenta',
                text: 'La cuenta bancaria fue creada con éxito',
                footer: ''
              }).then((result) => {
                 console.log(result);
                    if (result.value) {
                        this.router.navigate(['/cuenta-bancaria']);
                    }
                  });
            }
            else {
              swal({
                type: 'error',
                title: 'Crear Cuenta',
                text: 'response.message',
                footer: ''
              });
            }
          },
          error => {
            swal({
              type: 'error',
              title: 'Oops...',
              text: 'Algo salió mal ',
              footer: ''+error.message
            });
          }
      );
    }
    else {
      const CB = this.formCuentas;
      let cueBanc = {
        'tx_numecuenbanc' : CB.controls.tx_numecuenbanc.value,
        'tx_desccuenbanc' : CB.controls.tx_desccuenbanc.value,
        'tx_codicontcuba' : CB.controls.tx_codicontcuba.value,
        'tx_tipocuenbanc' : CB.controls.tx_tipocuenbanc.value,
        'tx_tipobanco'    : CB.controls.tx_tipobanco.value,
        'tx_impucuenta'   : CB.controls.tx_impucuenta.value,
        'nu_porcimpu'     : CB.controls.nu_porcimpu.value,

      };
      this.cuenbancService.actualizarCuentaBancaria(cueBanc,this.id_cuenbanc)
        .subscribe(response => {
            console.log(response);
            if (response.success){
              swal({
                type: 'success',
                title: 'Actualizar Cuenta',
                text: response.message,
                footer: ''
              }).then((result) => {
                  if (result.value) {
                      this.router.navigate(['/cuenta-bancaria']);
                  }
                });
            }
            else {
              let message = (response.message.length > 0) ? response.message : 'Error al Actualizar la Cuenta Bancaria';
              let errors = '';
              if (Array.isArray(response.errors) && response.errors.length > 0) {
                response.errors.forEach(strError => {
                    errors += '<li>' + strError + '</li>';
                });
              }
              swal({
                html: '<h5>' + message + '</h5>' + ((errors.length > 0) ? '<span style="text-align:left"><ul>' + errors + '</ul></span>' : ''),
                type: 'error',
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonClass: 'btn btn-danger',
                cancelButtonText: 'Cerrar',
                buttonsStyling: false
              }).catch(swal.noop);
            }
          },
          error => {
            swal({
              type: 'error',
              title: 'Ups...',
              text: 'Algo salió mal! ',
              footer: error.message
            });
          }
      );
    }
  }
}
