import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ProductoService} from '../services/producto.service';
import {Producto} from '../models/producto';

@Component({
  selector: 'producto-edit',
  templateUrl: '../views/producto-add.html',
  providers: [ProductoService]
})

export class ProductoEditComponent{
  public titulo: string;
  public producto: Producto;
  public filesToUpload;
  public resultUpload;
  public is_edit;

  constructor(
    private _productoService: ProductoService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.titulo = 'Editar producto';
    this.is_edit;
  }

  ngOnInit(){
    console.log(this.titulo);
    this.getProducto();
  }

  getProducto(){
    //Recoger el parametro de la URL y la informacion del producto
    //asignarsela a la variable de producto
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._productoService.getProducto(id).subscribe(
        response => {
          if(response.code == 200){
              this.producto = response.data;
          } else {
            this._router.navigate(['/productos']);
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    })
  }
}
