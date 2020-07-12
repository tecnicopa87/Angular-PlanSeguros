import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-lista-planes',
  templateUrl: './lista-planes.component.html',
  styleUrls: ['./lista-planes.component.css']
})
export class ListaPlanesComponent implements OnInit {
  planes:Array<Object>;
  antiguo:HTMLElement;
elmsSeleccionados:Array<HTMLElement>;

  constructor(private renderer:Renderer2) {
    this.planes=[
      {nombre:"Ahorro para el retiro",id:1},
      {nombre:"Imagina ser",id:2},
      {nombre:"Cumplir mis metas",id:3},
      {nombre:"Realiza",id:4},
      {nombre:"Asegurar educación",id:5},
      {nombre:"Segubeca",id:6},
      {nombre:"Vida mujer",id:7},
      {nombre:"Objetivo Vida",id:8},
      {nombre:"Alfa Medical",id:9}
    ]
   }

  ngOnInit(): void {
  }
  mostrarActivo(elemento:HTMLElement){ /* HTMLElement requerido p manejar el Render2*/
    if(this.antiguo){
      this.renderer.removeClass(this.antiguo,'destacado');
        
    }
  
  this.renderer.addClass(elemento,'destacado');/* así mantengo encapsulamiento*/
  //this.renderer.setAttribute(elemento,"data-seleccionado","true");
  
  let nuevoElemento=this.renderer.createElement("span");
  this.renderer.setProperty(nuevoElemento,"innerHTML"," 🚗")
  this.renderer.appendChild(elemento,nuevoElemento);

  this.antiguo=elemento;
 // this.elmsSeleccionados.push(this.antiguo);//ir almacenando itms HTML

 // this.renderer.setAttribute(boton,"value","A viajar jk");
  }

  resetActivo(){
    for (var elem in this.elmsSeleccionados)
    {
      console.log(elem);
      let nuevoElemento=this.renderer.selectRootElement("span");
      this.renderer.removeClass('destacado',elem);
      this.renderer.removeChild(elem,nuevoElemento);
      //this.renderer.addClass(elem,'');/* así mantengo encapsulamiento*/
    }
    }
  

}
