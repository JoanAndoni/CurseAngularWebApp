import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Producto } from '../models/producto';
import { GLOBAL } from './global'; //Importar el archivo donde se definio el metodo del
                                   //backend

@Injectable()
export class ProductoService{
  public url: string;

  constructor(
    public _http: Http
  ){
    //Crear variable de la URL del back end asignada desde
    //el archivo global.ts
    this.url = GLOBAL.url;
  }
  getProductos(){
    //Llamar a la peticion productos del backend para poder recibir la informacion
    //del metodo definido en el backend
    return this._http.get(this.url+'productos').pipe(map(res => res.json()));
  }

  //Recibir como parametro el objeto de producto
  addProducto(producto: Producto){
    //Convertir el objeto producto a un objeto de json
    let json = JSON.stringify(producto);

    //Variable de los parametros que se van a enviar a la peticion, 'json=' se
    //le concatena el objeto convertido a json que hemos creado
    let params = 'json='+json;

    //Es para decir que es un content type en concreto
    //Es como nuestro backend procesa la informacion que le mandamos por post
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

    //Mandar a llamar el metodo del backend que creamos para poder trabajar con el
    //en este caso le estamos mandando un objeto para agregarlo a la base de datos
    return this._http.post(this.url+'productos', params, {headers: headers})
                      .pipe(map(res => res.json()));
  }

  //Metodo para subir ficheros, recibe como parametros una URL, los params que son
  //elementos de la peticion, files -> los ficheros que va a subir
  makeFileRequest(url: string, params: Array<string>, files: Array<File>){
    //Regresara una funcion de Promise esta tiene como callBack si se sube bien o
    //se sube mal
    return new Promise((resolve, reject)=>{
      //Simulacion de un formulario normal
      var formData: any = new FormData();
      //Tener disponible el objeto para hacer peticiones AJAX
      var xhr = new XMLHttpRequest();

      //Loop para recorrer tdos los archivos que hay en el folder
      for(var i; i < files.length; i++){
        //Formulario que vamos a enviar, uploads[] campo que recibimos en el
        //backend
        formData.append('uploads[]', files[i], files[i].name);
      }

      //Funcion que checa el status de la peticion que se hará
      xhr.onreadystatechange = function(){
        if (xhr.readyState == 4){
          //Si es exitosa la subida con codigo 200
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          } else {
          //Si es erronea la subida con otro codigo
            reject(xhr.response);
          }
        }
      };

      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }
}
