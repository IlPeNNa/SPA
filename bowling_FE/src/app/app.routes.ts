import { Routes } from '@angular/router';
import { HomeComponent } from './conversazioni/home/home.component';
import { InfoProfiloComponent } from './conversazioni/profilo/info-profilo.component';
import { FormProfiloComponent } from './conversazioni/profilo/form-profilo.component';
import { ListaTorneiComponent } from './conversazioni/tornei/lista-tornei.component';
import { FormTorneiComponent } from './conversazioni/tornei/form-tornei.component';
import { FormAtletiComponent } from './conversazioni/atleti/form-atleti.component';
import { ListaAtletiComponent } from './conversazioni/atleti/lista-atleti.component';
import { FormArsenaleComponent } from './conversazioni/arsenale/form-arsenale.component';
import { ListaArsenaleComponent } from './conversazioni/arsenale/lista-arsenale.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profilo', component: InfoProfiloComponent },
  { path: 'profilo/modifica/:id', component: FormProfiloComponent },
  { path: 'tornei', component: ListaTorneiComponent },
  { path: 'tornei/nuovo', component: FormTorneiComponent },
  { path: 'tornei/modifica/:id', component: FormTorneiComponent },
  { path: 'atleti', component: ListaAtletiComponent },
  { path: 'atleti/modifica/:id', component: FormAtletiComponent },
  { path: 'arsenale', component: ListaArsenaleComponent },
  { path: 'arsenale/modifica/:id', component: FormArsenaleComponent }
];