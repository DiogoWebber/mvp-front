import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './views/home/home.component'
import { ConsultaComponent } from './views/consulta/consulta.component';
import { PepsPageComponent } from './components/peps-page/peps-page.component';
import { CepimPageComponent } from './components/cepim-page/cepim-page.component';
import { HistoricoPepsComponent } from './views/historico-peps/historico-peps.component';
import { HistoricoCepimComponent } from './views/historico-cepim/historico-cepim.component';

const routes: Routes = [{
  path: "",
  component: HomeComponent
},{
  path: "consulta",
  component: ConsultaComponent
},{
  path: "peps",
  component: PepsPageComponent
},{
  path: 'cepim',
  component: CepimPageComponent
},{
  path: 'pepsHistorico/:id',
  component: HistoricoPepsComponent
},{
  path: 'cepimHistorico/:id',
  component: HistoricoCepimComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
