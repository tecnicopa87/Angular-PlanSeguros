import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { cliente } from './altaclientes/Cliente/cliente';
import { Response} from './altaclientes/Cliente/Response';

const httpOption ={ //Sirven p solicitues post
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class WcfserviceService {
  url:string ="http://localhost:11936/PlanSeguro.svc/AltaClienteM";//"http://localhost:51020/api/Cliente";

  constructor(private _http:HttpClient) { }

   add(cliente:cliente):Observable<Response>{    
    return this._http.post<Response>(this.url,cliente,httpOption);
  }

}
