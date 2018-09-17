import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

@Component({
  selector: 'producto-add',
  templateUrl: '../views/producto-add.html',
  providers: [ProductoService]
})

export class ProductoAddComponent{
  public titulo: string;
  public producto: Producto;

  constructor(
    private _productoService: ProductoService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.titulo = 'Crear un nuevo producto';
    this.producto = new Producto(0 , '' ,'' ,0 ,'');
  }

  ngOnInit(){
    console.log('Componente producto-add.component.ts cargado');
  }

  onSubmit(){
    console.log(this.producto);
    //Llamar a la funcion addProducto previamente definida en nuestro service
    //y mandarle como parametro el producto que hemos creado con el form
    this._productoService.addProducto(this.producto).subscribe(
      response => {
        if(response.code == 200){
          //Cuando se agregue el producto nos redirigira a la pagina donde se
          // ven todos los productos
          this._router.navigate(['/productos']);
        } else {
          console.log(response);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  public filesToUpload;
  public resultUpload;

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }
}
