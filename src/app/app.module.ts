import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule } from '@angular/common/http'; /* servicios*/
import { AppComponent } from './app.component';
import { AltaclientesComponent } from './altaclientes/altaclientes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; /*luego de instalar NgBoostrap */
import {FormsModule} from '@angular/forms';
import {RouterModule,Routes} from '@angular/router';/*fundamental para Enrutamiento */
import { AppRoutingModule } from './app-routing.module';
import {ChartsModule} from 'ng2-charts';

// import {SecurityModule} from './security/security.module';
import {RegisterComponent} from './security/register/register.component'; /*en futuro solo se invocaría al Security de la línea anterior */
import { ReactiveFormsModule } from '@angular/forms';/* fundamental Formularios reactivos*/
import { ListaPlanesComponent } from './lista-planes/lista-planes.component';


const routes: Routes = [
  // {
  //   path:'security',
  // loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
  // },
  
];
@NgModule({
  declarations: [
    AppComponent,
    AltaclientesComponent,
    ListaPlanesComponent,
    RegisterComponent /* temporalmente*/
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule, 
    AppRoutingModule,   
   // SecurityModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
