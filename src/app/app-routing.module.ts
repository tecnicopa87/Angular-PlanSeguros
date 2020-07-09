import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './security/register/register.component';
import { AltaclientesComponent } from './altaclientes/altaclientes.component';
import { ListaPlanesComponent } from './lista-planes/lista-planes.component';

/* Creamos directiva para enrutamiento, apuntando a modulo security*/
const routes: Routes = [
  {path:'clientes',component:AltaclientesComponent},  
  {path:'listaplanes',component:ListaPlanesComponent},  
  {path:'**',pathMatch:'full',redirectTo:'clientes'},
  {
    path: 'register',
    component: RegisterComponent
   }
  //, {
  //   path: '**',
  //   redirectTo: 'register'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
