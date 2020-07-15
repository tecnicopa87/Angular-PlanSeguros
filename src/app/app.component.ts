import { Component/*, OnInit*/ } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent implements OnInit{ /*Manualmente agregué implements OnInit para utilizar NgbCalendar aquí */
//   title = 'PortalClientes';
//   model:NgbDateStruct; /* éstas propiedad requerida por control ngbootstrap*/
//   date:{year:number,month:number}
//   constructor(private ngbCalendar:NgbCalendar){}
//   ngOnInit() {    
//   }
//   selectToday(){
//     this.model=this.ngbCalendar.getToday();
//   }
export class AppComponent { /*Manualmente agregué implements OnInit para utilizar NgbCalendar aquí */
  title = 'PortalClientes';

  constructor(){}
  ngOnInit() {    
  }  
  
}
