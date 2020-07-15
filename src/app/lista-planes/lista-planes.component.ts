import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';

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

  constructor(private renderer: Renderer2) {
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
  mostrarActivo(elemento: HTMLElement,boton:HTMLElement) { /* HTMLElement requerido p manejar el Render2*/
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


}
