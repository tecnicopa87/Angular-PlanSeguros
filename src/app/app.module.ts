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
import { ReactiveFormsModule } from '@angular/forms';/* fundamental Formularios reactivos*/


const routes: Routes = [
  // {
  //   path:'security',
  // loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
  // },
  
];
@NgModule({
  declarations: [
    AppComponent,
    AltaclientesComponent
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
