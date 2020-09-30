import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cliente } from './altaclientes/Cliente/cliente';
import { Response } from './altaclientes/Cliente/Response';
import { RespCobertura } from './altaclientes/Cliente/RespCobertura';
import { promise } from 'protractor';
import { resolve } from 'dns';
import { Poliza } from './Poliza/Ipoliza';
import { rejects } from 'assert';
import { of } from 'rxjs';

const httpOption = { //Sirven p solicitues post
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8', //'Server-Ptotocol':'SOAP'     
  })
};

@Injectable({
  providedIn: 'root'
})


export class WcfserviceService {
  url: string = "api/AltaClientes/AltaCliente";//"http://localhost:10442/PlanSeguros.svc/AltaCliente";//"http://localhost:51020/api/Cliente";
  url2: string = "api/Cobertura/ObtenerCobertura";//"http://localhost:11936/PlanSeguro.svc/ObtenerCoberturaDataContract?dias=10&nivelriesgo=2";
  url3: string = "api/AltaClientes/BuscaCliente";
  url4: string = "api/Cobertura/ObtenerCuotaPago";
  url5: string = "api/Cobertura/ObtenerFechadePago";

  diasContrato: number;
  idregistrado: number = 0;//prvisional 
  modelClient: cliente;
  pathAutoriz: string;//*
  creaObservador;

  constructor(private _http: HttpClient) {

    this.creaObservador = new Observable(this.sequenceSubscriber);//<- como referencia en componente q invoca estas api
    console.log('constructor q instanció un observable');
  }


  sequenceSubscriber(observer) {//Proceso secuencial que verifique en base de datos
    // synchronously deliver 1, 2, and 3, then complete
    observer.next(this.llenamodel);
    observer.next(this.obtenFechaPago);
    //observer.next('tercera' + 4 * 3);
    observer.complete();

    // unsubscribe function doesn't need to do anything in this
    // because values are delivered synchronously
    return { unsubscribe() { } };
  }


  setRegistro(identificador: number) {
    return this.idregistrado = identificador;
  }
  //  add(cliente:cliente):Observable<Response>{     
  //   return this._http.post<Response>(this.url,cliente,httpOption);
  // }
  add(cliente: cliente) {
    let json = JSON.stringify(cliente);
    let _headers = new Headers().set('Content-Type', 'application/json');
    return this._http.post<Response>(this.url, json, httpOption);
  }

  buscaCliente(_idcliente): cliente {//<- porque metodo api devuelve un Objeto complejo
    console.log(`${this.url3}?id=${_idcliente}`);
    let observ = this._http.get<cliente>(`${this.url3}?id=${_idcliente}`);//capturo la clase modelo
    observ.subscribe(resp => {
      console.log('respuesta api:' + resp.Nombre + '' + resp.Apellidos);//ésta deberia ser antes de ha
      this.modelClient = resp;
      this.idregistrado = resp.idCliente; //<- lo acabo de agregar*
      console.log('en servicio el idregistrado=' + this.idregistrado);
      this.pathAutoriz = "/contratos";
      
    });
    console.log('ha responido la api,a continuacion el return de model');

    return this.modelClient;
  }

  buscaClienteRest(_idcliente) {//<- porque metodo api devuelve un Objeto complejo
    console.log(`${this.url3}?id=${_idcliente}`);
    return this._http.get<cliente>(`${this.url3}?id=${_idcliente}`);//capturo la clase modelo              
  }

  buscaClienteX(_idcliente: number) {
    //let request=fetch( this._http.get(`${this.url3}?id=${_idcliente}`)
    this.getClientAPI(_idcliente)
      .then(model => model.json())
      .then(post => {
        console.log('post => de promesa');
        this.llenamodel(post);
        return this.modelClient;
      })
      .catch(console.warn)
  }

  getClientAPI(_idcliente) {
    return fetch("http://localhost:10585/" + `${this.url3}?id=${_idcliente}`);
  }
  llenamodel(post) {
    console.log('llenando modelo');
    this.modelClient.Nombre = post.Nombre;
    this.modelClient.Apellidos = post.Apellidos;
    this.modelClient.RiesgoProfesion = post.RiesgoProfesion;
    this.modelClient.IngresosMensuales = post.IngresosMensuales;
    this.modelClient.FechaRegistro = post.FechaRegistro;
  }
  // otra promesa:
  mipromesa(_idcliente: number) {
    var p = new Promise(function (resolve, reject) {
      // Hacer tarea asíncrona y then...
      let observ = this._http.get(`${this.url3}?id=${_idcliente}`);
      if (observ != null) {
        resolve(this.modelClient = observ);
      }
      else {
        reject('produjo reject');
      }
    });

    p.then(function () {
      /* hacer algo con el resultado */
      console.log('promesa resolvió correcto,se llenará el modelo');

    }).catch(function () {
      /* error :( */
      console.warn();
    })
  }

  obtenCobertura(_dias: number, _riesgo: number): Observable<RespCobertura> {
    let params = "?dias=" + _dias + "&nivelriesgo=2";
    console.log('invocando a obtenerCobertura');
    return this._http.get<RespCobertura>(this.url2 + params);
  }

  obtenCuotaPago(_sumaasegurad: number, _plazo: number) {

  }
  obtenFechaPago(_ultimafecha: Date, dias: number): Date {
    let fechapagar;
    let objrespuesta = this._http.get(`${this.url5}?ultimafecha=${_ultimafecha}&dias=${dias}`);
    objrespuesta.subscribe(getfecha => {
      fechapagar = getfecha;
    });
    return fechapagar;
  }
  setDiasContrato(_recibeDias: number) {
    this.diasContrato = _recibeDias;
    return;
  }
  getDiasContrato() {
    return this.diasContrato;
  }

  getRegistro() {
    return this.idregistrado;
  }
  // ......
  //crearObservador() {
  //   // Create simple observable that emits three values
  //   const myObservable = of(1, 2, 3);

  //   // Create observer object
  //   const myObserver = {
  //     next: x => console.log('Observer got a next value: ' + x),
  //     error: err => console.error('Observer got an error: ' + err),
  //     complete: () => console.log('Observer got a complete notification'),
  //   };

  //   // Execute with the observer object
  //   myObservable.subscribe(myObserver);

  // Create a new Observable that will deliver the above sequence
  //const sequence=new Observable(sequenceSubscriber);


  // function sequenceSubscriber(observer) {
  //   // synchronously deliver 1, 2, and 3, then complete
  //   observer.next('primer tarea');
  //   observer.next('segunda'+2);
  //   observer.next(4*3);
  //   observer.complete();

  //   // unsubscribe function doesn't need to do anything in this
  //   // because values are delivered synchronously
  //   return {unsubscribe() {}};
  // }

  // sequence.subscribe({
  //   next(cualquier) { console.log('suscribiendo:en '+cualquier); },
  //   complete() { console.log('Finished sequence'); }
  // });

  //}



}
