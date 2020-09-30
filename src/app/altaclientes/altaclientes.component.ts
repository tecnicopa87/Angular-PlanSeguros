import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';/* manejar submit*/
import { cliente } from './Cliente/cliente';
import { Response } from './Cliente/Response'; /* Tipo de respuesta de mi servicio */
import { WcfserviceService } from '../wcfservice.service';

@Component({
  selector: 'app-altaclientes',
  templateUrl: './altaclientes.component.html',
  styleUrls: ['./altaclientes.component.css']
})
export class AltaclientesComponent implements OnInit {

  public micliente: cliente;
  result: string = '';
  dispara: boolean = false;

  usuario = {
    nombre: '',
    apellidos: '',
    riesgoProfesion: '',
    montoIngresos: ''
  }
  constructor(private apiCliente: WcfserviceService) { }

  ngOnInit(): void {
  }

  guardar(forma: NgForm) {
    console.log(forma.control);
    var collectionFrm = forma.value;
    for (let itm in collectionFrm) {
      console.log(`${forma.value[itm]} `);//, ${forma[itm]}`);           
    }

    const cliente: cliente = {
      idCliente: 0,
      Nombre: collectionFrm.nombre,
      Apellidos: collectionFrm.apellidos,
      RiesgoProfesion: parseInt(collectionFrm.riesgoProfesion),
      IngresosMensuales: parseFloat(collectionFrm.montoIngresos),
      FechaRegistro: new Date()
    };

    //   this.apiCliente.add(cliente).subscribe(response =>{
    //       alert('mandando'+cliente.nombre+' '+cliente.apellidos);
    //       if(response.exito==1){
    //         this.result=response.mensaje;
    //           };
    //       },
    // response => console.log('error al insertar Cliente,'+ response['mensaje']));
    this.apiCliente.add(cliente).subscribe(response => {
      //alert('mandando'+cliente.nombre+' '+cliente.apellidos);
      if (response.CodigoRespuesta == 200) {
        this.result = response.idCliente.toString();
        this.dispara = true;
        this.mostrarAlerta();
      };
    },
      response => console.log('error al insertar Cliente,' + response['Error']));

    // console.log(this.respWCF);
    if (forma.invalid) {
      Object.values(forma.controls).forEach(control => { //Object.values extrae valores de form
        control.markAsTouched();//ésto marca controles como tocados, p indicar q No son válidos
      })
      return;
    }
    //Para agregar campo adicional al select option:
    // this.profesion.unshift({
      //nombre: '[selecione profesion]',
      //valorx: ''       *Template select y validaciones
   // })
  }


  mostrarAlerta() {
    setTimeout(() => this.dispara = false, 3000);

  }


}
