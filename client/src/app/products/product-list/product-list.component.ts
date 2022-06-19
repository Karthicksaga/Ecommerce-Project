import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/model/product.model';
import { ProductService } from '../../core/services/product.service'
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  productList:any = [];
  //create array of ProductList
  // products: ProductModel[] = [
  //   new ProductModel(1, 'Product 1', 100, 'https://via.placeholder.com/150', 'Test Product'),
  // ]
  constructor(private productService: ProductService
    ,private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe((response) => {
      console.log("Got Product from the Server" + response);

      const serverResponse = response['response'];
      if(serverResponse['success'] ===  true) {
        this.productList = serverResponse['data'];
        console.log("Product List : " + this.productList);
        swal.fire({
          title: 'Success',
          text:serverResponse['message'],
          icon : "success",
          timer : 1000

        })
      }else{
        swal.fire({
          title: 'Error',
          text:serverResponse['message'],
          icon : "error",
          timer : 1000
        })
      }
    })
  }

  onAddProduct(){
    this.router.navigate(['admin/add-product']);
  }

  onEditProduct(productId : string){
    this.router.navigate(['admin/edit-product/'+productId]);
  }

  onDelete(productId :String){
    this.productService.onDeleteProduct(productId).subscribe((response) => {

      console.log("Product Deleted Successfully");
      const serverResponse = response['response'];
      if(serverResponse['success'] ===  true) {
        
        swal.fire({
          title: 'Success',
          text:serverResponse['message'],
          icon : "success",
          timer : 2000
        })
      }else{
        swal.fire({
          title: 'Error',
          text:serverResponse['message'],
          icon : "error",
          timer : 2000
        });
      }
    })
  }

}
