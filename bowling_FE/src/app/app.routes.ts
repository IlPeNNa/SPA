import { Routes } from '@angular/router';
import { HomeComponent } from './conversazioni/home/home.component';
import { ListaAtletiComponent } from './conversazioni/atleti/lista-atleti.component';
import { InfoAtletiComponent } from './conversazioni/atleti/info-atleti.component';
import { FormAtletiComponent } from './conversazioni/atleti/form-atleti.component';
import { ListaTorneiComponent } from './conversazioni/tornei/lista-tornei.component';
import { RisultatiTorneoComponent } from './conversazioni/tornei/risultati-torneo.component';
import { FormTorneiComponent } from './conversazioni/tornei/form-tornei.component';
/*import { InfoProfiloComponent } from './conversazioni/profilo/info-profilo.component';
import { FormProfiloComponent } from './conversazioni/profilo/form-profilo.component';
import { FormArsenaleComponent } from './conversazioni/arsenale/form-arsenale.component';
import { ListaArsenaleComponent } from './conversazioni/arsenale/lista-arsenale.component';*/

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'atleti', component: ListaAtletiComponent },
  { path: 'atleti/nuovo', component: FormAtletiComponent },
  { path: 'atleti/modifica/:id', component: FormAtletiComponent },
  { path: 'atleti/:id', component: InfoAtletiComponent },
  { path: 'tornei', component: ListaTorneiComponent },
  { path: 'tornei/nuovo', component: FormTorneiComponent },
  { path: 'tornei/modifica/:id', component: FormTorneiComponent },
  { path: 'tornei/:id/risultati', component: RisultatiTorneoComponent }
  /*{ path: 'profilo', component: InfoProfiloComponent },
  { path: 'profilo/modifica/:id', component: FormProfiloComponent },
  { path: 'arsenale', component: ListaArsenaleComponent },
  { path: 'arsenale/nuovo', component: FormArsenaleComponent },
  { path: 'arsenale/modifica/:id', component: FormArsenaleComponent }*/
];