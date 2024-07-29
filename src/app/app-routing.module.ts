import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './views/home/home.component'
import { ConsultaComponent } from './views/consulta/consulta.component';
import { PepsPageComponent } from './components/peps-page/peps-page.component';


const routes: Routes = [{
  path: "",
  component: HomeComponent
},{
  path: "consulta",
  component: ConsultaComponent
},{
  path: "peps",
  component: PepsPageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
