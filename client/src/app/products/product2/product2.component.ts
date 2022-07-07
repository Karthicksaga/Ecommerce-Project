import { Component, OnInit } from '@angular/core';
import { Product1Service } from '../product1/product1.component.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-product2',
  templateUrl: './product2.component.html',
  styleUrls: ['./product2.component.css']
})


export class Product2Component implements OnInit {

  products: any[]
  username: any
  categoryId = 2;

  constructor(private router:Router,
      private product1Service:Product1Service) { 
  }

  ngOnInit() { 
    this.getAllProductByCategory();
  }
  public getAllProductByCategory(){

    this.product1Service
    .getProductsByCategoryId(this.categoryId)
    .subscribe(response => {
      console.log("Server Response : " + response);
      const serverResponse = response['response'];

      if(serverResponse['success'] == true){

        console.log("Electronic Product fetched Successfully");
        this.products = serverResponse['data'];
        console.log(this.products);
       
          swal.fire({
            title : "Success",
            "text" : serverResponse['message'],
            icon : "success",
            timer : 2000
          });
      }else{
        console.log("Server Response" + serverResponse);
        swal.fire({
          title : "Error",
          text : serverResponse['message'],
          icon : "error",
          timer : 2000
        })
      }
    },(error : any) => {
      swal.fire({
        title : "Error",
        text : "product not found",
        icon : "error",
        confirmButtonText : "Back-to-home-Page"
        
      }).then((result) => {
        this.router.navigate(['/home'])
      })
    }
    )
  }

  public getAllProducts() {
  this.product1Service
    .getProducts()
    .subscribe(response => {
      console.log(response);
      const serverResponse = response;
      if(serverResponse['success'] ===  true) {
        if(serverResponse['data'].length > 0) {

          this.products = serverResponse['data'];
          swal.fire({
            title: 'Success',
            text:response['message'],
            icon : "success",
            timer : 1000
          })
        }
      }else{
        swal.fire({
          title: 'Error',
          text:response['message'],
          icon : "error",
          timer : 1000,
        })
      }
    })
    
}
 

OnSelectProduct(id: String) {
  console.log("Product Id :" + id)
  this.router.navigate(['product-details/'+id])
}
}

