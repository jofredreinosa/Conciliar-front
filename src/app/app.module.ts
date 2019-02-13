import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuMainComponent } from './menu-main/menu-main.component';
import { CuenBancComponent } from './cuen-banc/cuen-banc.component';
import { CuenbancsService } from './Services/cuenbancs.service';
import { TipotranComponent } from './tipotran/tipotran.component';
import { ModaltranbancComponent } from './modaltranbanc/modaltranbanc.component';
import { CreartranlibrComponent } from './creartranlibr/creartranlibr.component';
import { FrmcuenBancComponent } from './frmcuen-banc/frmcuen-banc.component';
import { BuscarTipoTransComponent } from './buscar-tipo-trans/buscar-tipo-trans.component';
import { LoaderComponent } from './loader/loader.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuMainComponent,
    CuenBancComponent,
    TipotranComponent,
    ModaltranbancComponent,
    CreartranlibrComponent,
    FrmcuenBancComponent,
    BuscarTipoTransComponent,
    LoaderComponent
  ],
  imports: [
    routes,
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CuenbancsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
