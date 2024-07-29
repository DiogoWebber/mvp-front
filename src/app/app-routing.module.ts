import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './views/home/home.component'
import { ConsultaComponent } from './views/consulta/consulta.component';



const routes: Routes = [{
  path: "",
  component: HomeComponent
},{
  path: "consulta",
  component: ConsultaComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
