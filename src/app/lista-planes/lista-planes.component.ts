import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ServicePlanesService } from '../service-planes.service';
import { Poliza } from '../Poliza/Ipoliza';
import { WcfserviceService } from '../wcfservice.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'app-lista-planes',
  templateUrl: './lista-planes.component.html',
  styleUrls: ['./lista-planes.component.css']
})

export class ListaPlanesComponent implements OnInit {

  planes: Array<Object>;
  antiguo: HTMLElement;
  elmsSeleccionados: HTMLElement[] = [];
  planactive: string;
  idCliente:number;//requisito mínimo para avanzar
  routerAutorize:string;// p avanzar

 modelo ={
  txtdias:'',
  txtidclient:''
 };
 _http3: HttpClient;
//intento quitar la segunda variable del servicio
  constructor(private renderer: Renderer2,private _http2: HttpClient,public listaplanes:ServicePlanesService,private apiseguro:WcfserviceService) {
    this.planes = [
      { nombre: "Ahorro para el retiro", id: 1 },
      { nombre: "Imagina ser", id: 2 },
      { nombre: "Cumplir mis metas", id: 3 },
      { nombre: "Realiza", id: 4 },
      { nombre: "Asegurar educación", id: 5 },
      { nombre: "Segubeca", id: 6 },
      { nombre: "Vida mujer", id: 7 },
      { nombre: "Objetivo Vida", id: 8 },
      { nombre: "Alfa Medical", id: 9 }
    ]
  }

  ngOnInit(): void {
    
  }
  mostrarActivo(elemento: HTMLElement,boton:HTMLElement,_poliza:Poliza) { /* HTMLElement requerido p manejar el Render2*/
    if (this.antiguo) {
      this.renderer.removeClass(this.antiguo, 'destacado');
    }

    this.renderer.addClass(elemento, 'destacado');/* así mantengo encapsulamiento*/
    this.renderer.setAttribute(elemento,"data-seleccionado","true"); /* ésta opcional*/
    console.log(elemento);

    let nuevoElemento = this.renderer.createElement("span");
    this.renderer.setProperty(nuevoElemento, "innerHTML", " 🚗")
    this.renderer.appendChild(elemento, nuevoElemento);
    
    this.antiguo = elemento;
    this.elmsSeleccionados.push(elemento);//ir almacenando itms HTML   
    this.agregaplan(_poliza); 

     this.renderer.setAttribute(boton,"value"," Adquirir ");
     this.renderer.removeAttribute(boton,'disabled');
  }

  resetActivo(boton:HTMLElement) { //Este evento borra childNodes de Elements q fueron seleccionados
    
    this.renderer.setAttribute(boton,"disabled","disabled");
    //let milemento=this.renderer.selectRootElement("ul");//pensaría que asi puedo obtenerlo
    //console.log(elem[i]);  DESAPARACE TODOS LOS ELEMENTOS  ???
    let nuevoElemento = this.renderer.selectRootElement("span");
    //console.log(nuevoElemento);/* <- aquí devuelve: <span _ngcontent-hjm-c18></span>  */ 
    //this.renderer.removeClass('destacado',milemento);
    //this.renderer.setProperty(nuevoElemento, "innerHTML", "*"); <- es correcto p agregar contenido a <span></span>
    
    //abstract removeAttribute(el: any, name: string, namespace?: string): void
    var milemento = this.elmsSeleccionados;
    for (var i = 0; i < milemento.length; i++) {
      //console.log(milemento[i].firstChild.nodeValue);
      //console.log(this.elmsSeleccionados[i].firstElementChild);
      if (this.elmsSeleccionados[i].nodeType== 1){
      this.renderer.removeChild(this.elmsSeleccionados[i], this.elmsSeleccionados[i].firstElementChild);//this.elmsSeleccionados[i].firstElementChild,nuevoElemento);
      
      }
    }

  }

agregaplan(_plan){
 //alert('agregando a lista'+_plan.id);
  this.listaplanes.agregarPoliza(_plan);  
}
mandaDias(_dias){
  this.listaplanes.setdias(_dias);
  console.log('mando dias'+_dias);
}
verificacliente(_id){
  console.log('ejcutando verificacliente( id)');
 // this.listaplanes.buscaclient(_id);//funcion retorna true si existe,false cuando no
 
  var p = new Promise(function (resolve, reject) {
    // Hacer tarea asíncrona y then...  
    let observ =this._http3.get(`http://localhost:10585/api/AltaClientes/BuscaCliente?id=${_id}`);
    
    //console.log(this._http.get(`api/AltaClientes/BuscaCliente?id=${_id}`);
    if ( observ!=null) {
      resolve(this.apiseguro.modelClient=observ);
    }
    else {
      reject('Fallo la promesa!');
    }
  });

  p.then(function () {
    /* hacer algo con el resultado */
    console.log('promesa resolvió correcto,se llenará el modelo');  
    console.log('en componente recojo el idregistrado'); 
  this.idCliente=this.apiseguro.modelClient.idCliente;//<- opcion a capturar id
  alert(this.idCliente);  
  }).catch(function () {
    /* error :( */
      return this._http3.get("http://localhost:10585/api/AltaClientes/BuscaCliente?id="+`${_id}`);
      console.warn();
  })

 //this.apiseguro.buscaCliente(_id);//Devuelve un id si existe, 0 cundo no y se deberá impedir Aquirirplan  
  
}

validarfrm(frm:NgForm){
let frmcontrols=frm.value;
const observ= of(this.apiseguro.buscaClienteRest(frmcontrols.txtidclient));// <- llamo al metodo del servicio

// let observ= this.apiseguro.buscaClienteRest(frmcontrols.txtidclient);
// observ.subscribe(resp => {
//   console.log('respuesta api:' + resp.Nombre+ ' '+resp.Apellidos);//ésta deberia ser antes de ha
//   this.apiseguro.llenamodel(resp);
//   this.apiseguro.setRegistro(resp.idCliente); //<- lo acabo de agregar*
//   //this.routerAutorize="/contratos";
// });

// this.apiseguro.creaObservador.subscribe({ //Luego
//   next(argumento){ console.log('suscribiendo:en '+argumento); },
//   complete()
// });
observ.subscribe(resp =>{
  if (resp!=null)
  {
    //alert('promesa BuscarCliente exitosa'+resp['Nombre']);
    this.routerAutorize="/contratos";
    console.log('path autorizado');
    this.listaplanes.datosCliente(frmcontrols.txtidclient);
  }
  
})
//LUEGO QUE RESPONDA API, HABILITAR LA NAVEGACIÓN HACIA OTRA PAGINA
//alert('debió verificar client,enseguida routerlink se autoriza');
//this.routerAutorize=this.apiseguro.pathAutoriz;//"/contratos";
//console.log('el path recibido del Service:'+this.apiseguro.pathAutoriz);
}

idNoValido(){
  return (this.idCliente==0)? true:false;
}

}
