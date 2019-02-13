
import { CuenBancComponent } from './cuen-banc/cuen-banc.component';
import { TipotranComponent } from './tipotran/tipotran.component';
import { CreartranlibrComponent } from './creartranlibr/creartranlibr.component';
import { FrmcuenBancComponent } from './frmcuen-banc/frmcuen-banc.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';


const appRoutes: Routes = [
    { path: 'cuenta-bancaria', component: CuenBancComponent },
    { path: 'tipo-transacc'  , component: TipotranComponent },
    { path: 'crear-trlibr'   , component: CreartranlibrComponent },
    { path: 'nueva-cuenbanc'   , component: FrmcuenBancComponent },
    { path: 'editar-cuenbanc/:id_cuenbanc'   , component: FrmcuenBancComponent },
    
];

export const routes:ModuleWithProviders = RouterModule.forRoot(appRoutes);
