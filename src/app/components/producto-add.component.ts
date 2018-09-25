import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../services/global';

@Component({
  selector: 'producto-add',
  templateUrl: '../views/producto-add.html',
  providers: [ProductoService]
})

export class ProductoAddComponent{
  public titulo: string;
  public producto: Producto;
  // Archivos para subir
  public filesToUpload;
  // Resultado del archivo para subir
  public resultUpload;

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

    if (this.filesToUpload &&  this.filesToUpload.length >= 1){
      //Funcion para subir el archivo que se desea
      //Construye la url que crea la URL del archivo a subir, parametros vacios
      //indicar que este archivo se subira
      this._productoService.makeFileRequest(GLOBAL.url+'upload-file', [],this.filesToUpload).then((result) => {
        console.log(result);
        this.resultUpload = result;
        //Asignar el valor del file a el atributo de la base de datos imagen
        this.producto.imagen = this.resultUpload.filename;
        this.saveProducto();
      }, (error) =>{
        console.log(error);
      });
    } else {
      this.saveProducto();
    }
  }

  saveProducto(){
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

  //Cuando se seleccione un archivo
  fileChangeEvent(fileInput: any){
    //Agarrar los datos del fileInput
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }
}
