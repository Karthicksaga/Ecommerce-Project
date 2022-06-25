import { Component, OnInit } from '@angular/core';
import { Product1Service } from '../product1/product1.component.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-product3',
  templateUrl: './product3.component.html',
  styleUrls: ['./product3.component.css']
})
export class Product3Component implements OnInit {

    products: any[]
    username: any
    categoryId = 3;

    constructor(private router:Router,
        private productService:Product1Service) { 
    }

    ngOnInit(): void {
        
    }

    public getAllProductByCategory(){

      this.productService
      .getProductsByCategoryId(this.categoryId)
      .subscribe(response => {
        console.log("Server Response : " + response);
        const serverResponse = response['response'];
  
        if(serverResponse['status']  === true){
          this.products = serverResponse['data'];
          if(this.products !== null){
            swal.fire({
              title : "Success",
              "text" : serverResponse['message'],
              icon : "success",
              timer : 2000
            });
          }else{
            swal.fire({
                title : "Error",
                "text" : serverResponse['message'],
                icon: "success",
                timer : 2000
            })
          }
        }else{
          console.log("Server Response" + serverResponse);
          swal.fire({
            title : "Error",
            text : serverResponse['message'],
            icon : "error",
            timer : 2000
          })
        }
      }
      )
    }
  
  OnSelectProduct(id: number) : void {
    this.router.navigate(['/product/product_details/'+id])
  }

}
