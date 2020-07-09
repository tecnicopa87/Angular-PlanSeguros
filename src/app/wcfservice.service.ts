import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { cliente } from './altaclientes/Cliente/cliente';
import { Response} from './altaclientes/Cliente/Response';

const httpOption ={ //Sirven p solicitues post
  headers:new HttpHeaders({
    'Content-Type':'application/json; charset=utf-8', //'Server-Ptotocol':'SOAP'     
  })
};

@Injectable({
  providedIn: 'root'
})

export class WcfserviceService {
  url:string ="api/AltaClientes/AltaCliente";//"http://localhost:10442/PlanSeguros.svc/AltaCliente";//"http://localhost:51020/api/Cliente";

  constructor(private _http:HttpClient) { }

  //  add(cliente:cliente):Observable<Response>{     
  //   return this._http.post<Response>(this.url,cliente,httpOption);
  // }
  add(cliente:cliente){ 
    let json=JSON.stringify(cliente) ; 
     let _headers=new Headers().set('Content-Type','application/json') ;
    return this._http.post<Response>(this.url,json,httpOption);
  }

}
