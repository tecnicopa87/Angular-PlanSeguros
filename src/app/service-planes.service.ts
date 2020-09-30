import { Injectable } from '@angular/core';
import { Poliza } from './Poliza/Ipoliza';
import { HttpClient } from '@angular/common/http';
import { WcfserviceService } from './wcfservice.service';

import { cliente } from './altaclientes/Cliente/cliente';//*Para acceder a datos de cliente en el componente requerido(poliza_contrato)
import { Observable, of } from 'rxjs';
import { CompileTemplateMetadata } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ServicePlanesService {
  url3: string = "api/AltaClientes/BuscaCliente";//*
  idclient: number = 0;
  micliente: cliente;
  fechapago: Date;


  listpoliza: Poliza[];
  constructor(private _http: HttpClient, public wcfseguros: WcfserviceService) {
    this.listpoliza = [];
  }

  agregarPoliza(_poliza: Poliza) {
    this.listpoliza.push(_poliza);
  }
  mostrarPolizas() {
    if (this.listpoliza.length > 0) {
      return this.listpoliza;
    } else {
      return false;
    }
  }

  calcularCuota(_dias: number, _riesgo: number) {
    return this.wcfseguros.obtenCobertura(_dias, _riesgo);
  }
  setdias(_dias: number) { //Uso como servicio intermedio para aislar logica de negocio
    this.wcfseguros.setDiasContrato(_dias);
  }
  getdias() {
    return this.wcfseguros.diasContrato;
  }

  getregistro() {
    //const observ = of(this.wcfseguros.modelClient);
    //this.micliente=this.wcfseguros.modelClient;//Previamente fué llamado por lista-planes.ts
    // observ.subscribe(resp => {
    //   this.idclient = resp.idCliente;
    //   this.fechapago = this.wcfseguros.obtenFechaPago(this.micliente.FechaRegistro, this.getdias());
    return this.wcfseguros.modelClient;
  }
  //console.log('intentaría llamar idcliente');
  //this.idclient= this.micliente.idCliente;
  //this.fechapago=this.wcfseguros.obtenFechaPago(this.micliente.FechaRegistro,this.getdias());
  //console.log('debió obtener modelo de wcfseguros de:'+this.micliente.Nombre);
  // return this.idclient;

  getfechapago(_fecharegistro: Date) {
    return this.wcfseguros.obtenFechaPago(_fecharegistro, this.getdias());
  }
  datosCliente(idclient: number) {//Me subscribo al metodo existente en servicio

    console.log('buscando datos de id:' + idclient);
    this.wcfseguros.buscaClienteRest(idclient).subscribe(resp => {
      this.micliente = resp;
      console.log('datos resultado:' + this.micliente.Nombre+ ' '+this.micliente.FechaRegistro);
    });
  }

  // buscaclient(_id:number){  
  //   //this.wcfseguros.buscaClienteB();
  //   //console.log('ejecutó desde servicio intermedio');//pero no ejecutó
  //   this.datosCliente(_id);
  //   if (this.micliente!=null){//Si el id existe
  //     this.wcfseguros.setRegistro(_id);//Reasigno valor idregistrado en servicio
  //     console.log('existe cliente del txt');
  //  return true;
  //   }else{
  //     console.log('No existe cliente en txt');
  //     return false;
  //   };
  // }

}
