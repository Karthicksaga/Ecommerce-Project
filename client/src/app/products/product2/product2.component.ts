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

    Products: any[]
    username: any
    categoryId = 2

    constructor(private router:Router,
        private product1Service:Product1Service) { 
      // this.loadflag()
      //this.loadAllProducts()
    }

    ngOnInit() { 
    
    }

  public getAllProductByCategory(){

    this.product1Service
    .getProductsByCategoryId(this.categoryId)
    .subscribe(response => {
      console.log("Server Response : " + response);
      const serverResponse = response['response'];

      if(serverResponse['status']  === true){
        this.Products = serverResponse['data'];
        if(this.Products !== null){
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

  


  OnSelectProduct(id: number) {
    this.router.navigate(['product/product_details/'+id])
  }

}

