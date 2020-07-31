import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';/* manejar submit*/
import { cliente } from './Cliente/cliente';
import { Response} from './Cliente/Response'; /* Tipo de respuesta de mi servicio */
import {WcfserviceService} from '../wcfservice.service';

@Component({
  selector: 'app-altaclientes',
  templateUrl: './altaclientes.component.html',
  styleUrls: ['./altaclientes.component.css']
})
export class AltaclientesComponent implements OnInit {

  public micliente:cliente;
  result:string='';
  tiempoAlert:number;

  usuario= {
    nombre:'',
    apellidos:'',
    riesgoProfesion:'',
    montoIngresos:''
  }
  constructor(private apiCliente:WcfserviceService) { }

  ngOnInit(): void {
  }
 
  guardar( forma: NgForm){
    console.log(forma.control);
    var collectionFrm=forma.value;
    for(let itm in collectionFrm)
    {
      console.log(`${forma.value[itm]} `);//, ${forma[itm]}`);           
    }            
    
    const cliente:cliente= {
      id:0,
      nombre:collectionFrm.nombre,
      apellidos:collectionFrm.apellidos,
      riesgoProfesion:parseInt(collectionFrm.riesgoProfesion),
      IngresosMensuales:parseFloat(collectionFrm.montoIngresos),
      fecharegistro:new Date()
    };
    
  //   this.apiCliente.add(cliente).subscribe(response =>{
  //       alert('mandando'+cliente.nombre+' '+cliente.apellidos);
  //       if(response.exito==1){
  //         this.result=response.mensaje;
  //           };
  //       },
  // response => console.log('error al insertar Cliente,'+ response['mensaje']));
  this.apiCliente.add(cliente).subscribe(response =>{
    //alert('mandando'+cliente.nombre+' '+cliente.apellidos);
    if(response.CodigoRespuesta==200){
      this.result=response.idCliente.toString();
        };
    },
response => console.log('error al insertar Cliente,'+ response['Error']));
    
   // console.log(this.respWCF);
if( forma.invalid){
Object.values(forma.controls).forEach( control=>{
  control.markAsTouched();
})
  return ;
}
  }

  
  mostrarAlerta(){
setTimeout(()=>this.tiempoAlert=3000);
  }
  

}
