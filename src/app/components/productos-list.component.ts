import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

@Component({
  selector: "productos-list",
  templateUrl: '../views/productos-list.html',
  providers: [ProductoService]
})

export class ProductosListComponent{
  public titulo: string;
  public productos: Producto[];
  public confirmado;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productoService: ProductoService
  ){
    this.titulo = 'Listado de productos';
    this.confirmado = null;
  }

  ngOnInit(){
    console.log('productos-list.ts cargado');
    this.getProductos();
  }

  getProductos(){
    //Mandar a llamar la funcion de getProductos
    //la cual recibe un json que decodifica
    this._productoService.getProductos().subscribe(
      //Aqui se recibe lo que regresa la funcion llamada
      result => {
        if(result.code != 200){
          console.log(result);
        } else {
        //Aquí se asigna el json recibido que se encuentra en message y
        //decodificado a el array de los productos.
        this.productos = result.message;
        console.log(result);
        }
      },
      //Aqui no se recibio nada por lo cual se crea un error
      error => {
        console.log(<any>error);
      }
    );
  }
  
  borrarConfirm(id){
    this.confirmado = id;
  }

  cancelarConfirm(){
    this.confirmado = null;
  }

  onDeleteProducto(id){
    this._productoService.deleteProducto(id).subscribe(
      response => {
        if(response.code == 200){
          this.getProductos();
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
