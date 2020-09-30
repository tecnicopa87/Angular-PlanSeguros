import { Component, OnInit } from '@angular/core';
import { Poliza } from '../Poliza/Ipoliza';
import { ServicePlanesService } from '../service-planes.service';
import { HttpClient } from '@angular/common/http';
import { cliente } from '../altaclientes/Cliente/cliente';
import { of } from 'rxjs';

@Component({
    selector: 'app-poliza',
    templateUrl: 'poliza_contrato.html'
})

export class FormatoPolizaComponent implements OnInit {
    planes: Poliza[] | false;
    beneficiario: string;
    leyenda:string;
    cuota: string;
    riesgo: number;
    fechapago:Date;

    constructor(private _http: HttpClient, private listaplanes: ServicePlanesService) {
        this.planes = [{ id: 0, nombre: '' }];
        
        //    listaplanes.datosCliente();//Lleno el objeto en servie intermedio q contiene clase micliente
            this.riesgo = listaplanes.micliente.RiesgoProfesion;//listaplanes.micliente.RiesgoProfesion;
            console.log('Nivelriesgo y adicionl corresponden a ' + listaplanes.micliente.Nombre);
            this.beneficiario =listaplanes.micliente.Nombre +' '+ listaplanes.micliente.Apellidos;
            this.leyenda= 'declaro tener un monto de $'+listaplanes.micliente.IngresosMensuales+' mensuales'
            this.fechapago=listaplanes.getfechapago(listaplanes.micliente.FechaRegistro);
       
    }

    ngOnInit() {
              
        this.listaplanes.calcularCuota(this.listaplanes.getdias(), this.riesgo).subscribe(resp => {
            if (resp.CodigoRespuesta == 200) {
                this.cuota = resp.cobertura;
            } else {
                this.cuota = "pendiente ..";
            }
        });
        this.planes = this.listaplanes.mostrarPolizas();

    }
    // obtenCuota(){
    //   return this.listaplanes.calcularCuota();
    // }


}